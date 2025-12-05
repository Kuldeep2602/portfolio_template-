const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Octokit } = require('octokit');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Multer setup for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'text/plain') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF, DOCX, and TXT files are allowed'));
        }
    }
});

const PORT = process.env.PORT || 3001;
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TEMPLATE_OWNER = 'Kuldeep2602';
const TEMPLATE_REPO = 'portfolio_template-';


// 1. Redirect to GitHub OAuth
app.get('/auth/github', (req, res) => {
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
    res.redirect(redirectUri);
});

// 2. Handle Callback and Exchange Code for Token
app.get('/auth/github/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
        }, {
            headers: { Accept: 'application/json' }
        });

        const accessToken = response.data.access_token;

        // Return HTML that sends token to opener and closes popup
        res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'GITHUB_AUTH_SUCCESS', token: '${accessToken}' }, '*');
            window.close();
          </script>
        </body>
      </html>
    `);
    } catch (error) {
        console.error('OAuth Error:', error);
        res.status(500).send('Authentication failed');
    }
});

// 3. Deploy Endpoint: Fork and Commit Config
app.post('/api/deploy', async (req, res) => {
    const { token, config, repoName } = req.body;

    if (!token || !config) {
        return res.status(400).json({ error: 'Missing token or config' });
    }

    const octokit = new Octokit({ auth: token });

    try {
        // A. Get Authenticated User
        const { data: user } = await octokit.rest.users.getAuthenticated();
        const username = user.login;
        const targetRepoName = repoName || `my-portfolio-${Date.now()}`;

        // B. Fork the Repository
        let repo;
        let actualRepoName;
        try {
            // Try to create using template first (cleaner history)
            const createResp = await octokit.rest.repos.createUsingTemplate({
                template_owner: TEMPLATE_OWNER,
                template_repo: TEMPLATE_REPO,
                name: targetRepoName,
                owner: username,
                private: false,
            });
            repo = createResp.data;
            actualRepoName = repo.name;
        } catch (templateError) {
            console.log('Template creation failed, trying fork...', templateError.message);
            // Fallback to Fork - note: fork keeps original repo name
            const forkResp = await octokit.rest.repos.createFork({
                owner: TEMPLATE_OWNER,
                repo: TEMPLATE_REPO,
                default_branch_only: true,
            });
            repo = forkResp.data;
            actualRepoName = repo.name;
            console.log('Forked repo actual name:', actualRepoName);
        }

        // Wait longer for repo to be ready (GitHub API propagation can be slow)
        console.log('Repository:', actualRepoName, '- waiting for GitHub to propagate...');
        await new Promise(r => setTimeout(r, 5000));

        // C. Update/Create portfolio.config.json with retry logic
        const content = Buffer.from(JSON.stringify(config, null, 2)).toString('base64');

        // Try up to 3 times with increasing delays
        let attempts = 0;
        let lastError;

        while (attempts < 3) {
            try {
                // First, try to get the file SHA if it exists
                let sha;
                try {
                    const { data: fileData } = await octokit.rest.repos.getContent({
                        owner: username,
                        repo: actualRepoName,
                        path: 'src/portfolio.config.json',
                    });
                    sha = fileData.sha;
                } catch (e) {
                    // File doesn't exist, that's fine - we'll create it
                    console.log('File does not exist yet, will create new file');
                }

                await octokit.rest.repos.createOrUpdateFileContents({
                    owner: username,
                    repo: actualRepoName,
                    path: 'src/portfolio.config.json',
                    message: 'Update portfolio configuration',
                    content,
                    sha,
                });

                console.log('Successfully updated portfolio config!');
                break; // Success!
            } catch (e) {
                lastError = e;
                attempts++;
                console.log(`Attempt ${attempts} failed: ${e.message}. Retrying...`);
                await new Promise(r => setTimeout(r, 2000 * attempts));
            }
        }

        if (attempts === 3) {
            throw lastError;
        }

        // D. Also create .env file to enable viewer mode (hides editor UI)
        console.log('Creating .env for viewer mode...');
        const envContent = Buffer.from('VITE_VIEWER_MODE=true\n').toString('base64');
        try {
            // Check if .env already exists and get its SHA
            let envSha;
            try {
                const { data: envFile } = await octokit.rest.repos.getContent({
                    owner: username,
                    repo: actualRepoName,
                    path: '.env',
                });
                envSha = envFile.sha;
            } catch (e) {
                // File doesn't exist, that's fine
            }

            await octokit.rest.repos.createOrUpdateFileContents({
                owner: username,
                repo: actualRepoName,
                path: '.env',
                message: 'Enable viewer mode',
                content: envContent,
                sha: envSha,
            });
            console.log('Viewer mode enabled!');
        } catch (e) {
            console.log('Could not create .env:', e.message);
            // Non-fatal - continue anyway
        }

        // D. Return the new Repo URL
        res.json({
            success: true,
            repoUrl: repo.html_url,
            deployUrl: `https://vercel.com/new/clone?repository-url=${repo.html_url}`
        });

    } catch (error) {
        console.error('Deploy Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 4. Resume Parsing Endpoint
app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
    console.log('Parsing resume...');

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    try {
        // Extract text from PDF
        let resumeText = '';

        if (req.file.mimetype === 'application/pdf') {
            const pdfData = await pdfParse(req.file.buffer);
            resumeText = pdfData.text;
        } else if (req.file.mimetype === 'text/plain') {
            resumeText = req.file.buffer.toString('utf-8');
        } else {
            // For DOCX, we'll try to extract raw text (basic extraction)
            resumeText = req.file.buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ');
        }

        console.log('Extracted text length:', resumeText.length);

        // Manually extract URLs from the text using regex
        const urlRegex = /https?:\/\/[^\s\)\]\>\"\']+/gi;
        const foundUrls = resumeText.match(urlRegex) || [];
        console.log('Found URLs in resume:', foundUrls);

        // Also look for common patterns without http
        const githubPattern = /github\.com\/[\w\-]+/gi;
        const linkedinPattern = /linkedin\.com\/in\/[\w\-]+/gi;
        const twitterPattern = /twitter\.com\/[\w]+/gi;

        const githubMatches = resumeText.match(githubPattern) || [];
        const linkedinMatches = resumeText.match(linkedinPattern) || [];
        const twitterMatches = resumeText.match(twitterPattern) || [];

        // Build extracted links array
        const extractedLinks = [];
        githubMatches.forEach(m => extractedLinks.push({ platform: 'github', url: 'https://' + m, label: 'GitHub' }));
        linkedinMatches.forEach(m => extractedLinks.push({ platform: 'linkedin', url: 'https://' + m, label: 'LinkedIn' }));
        twitterMatches.forEach(m => extractedLinks.push({ platform: 'twitter', url: 'https://' + m, label: 'Twitter' }));

        console.log('Extracted social links:', extractedLinks);

        // Use Gemini to parse the resume
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `Parse the following resume and extract information into a JSON object with this exact structure. Fill in as much as possible from the resume. Use placeholder text for missing fields.

IMPORTANT: Look carefully for social media links, GitHub profiles, LinkedIn URLs, Twitter/X handles, portfolio websites, and any other online presence. These are often listed in the header, contact section, or footer of resumes. Extract ALL links you find.

Return ONLY valid JSON, no markdown or explanations.

{
  "hero": {
    "name": "Full Name",
    "title": "Job Title/Role",
    "tagline": "Short tagline (2-3 words)",
    "taglineHighlight": "Highlighted word",
    "subtitle": "Professional summary (1-2 sentences)",
    "availableForWork": true
  },
  "about": {
    "initials": "XX",
    "fullName": "Full Name",
    "role": "Job Title",
    "location": "City, Country",
    "email": "email@example.com",
    "bio": "Professional bio paragraph",
    "skills": ["skill1", "skill2", "skill3"]
  },
  "experiences": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "companyUrl": "",
      "startDate": "Year",
      "endDate": "Year or Present",
      "current": false,
      "highlights": ["Achievement 1", "Achievement 2"],
      "color": "blue"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "tags": ["tech1", "tech2"],
      "demoUrl": "",
      "codeUrl": ""
    }
  ],
  "contact": {
    "email": "email@example.com",
    "locationText": "Location",
    "phone": ""
  },
  "socialLinks": [
    {
      "platform": "github",
      "url": "https://github.com/username",
      "label": "GitHub"
    },
    {
      "platform": "linkedin",
      "url": "https://linkedin.com/in/username",
      "label": "LinkedIn"
    },
    {
      "platform": "twitter",
      "url": "https://twitter.com/username",
      "label": "Twitter"
    },
    {
      "platform": "website",
      "url": "https://portfolio-website.com",
      "label": "Portfolio"
    }
  ]
}

Note: For socialLinks, use these platform values: "github", "linkedin", "twitter", "website", "email", "dribbble", "behance", "medium", "youtube", "instagram". Only include links that are actually found in the resume.

Resume text:
${resumeText.substring(0, 15000)}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let jsonText = response.text();

        // Clean up the response - remove markdown code blocks if present
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        console.log('Gemini response received');

        // Parse the JSON
        const parsedData = JSON.parse(jsonText);

        // Build the complete portfolio config
        const portfolioConfig = {
            version: "1.0.0",
            meta: {
                siteTitle: `${parsedData.hero?.name || 'My'} Portfolio`,
                siteDescription: parsedData.hero?.subtitle || "Welcome to my portfolio"
            },
            theme: {
                primaryColor: "#3B82F6",
                secondaryColor: "#8B5CF6",
                accentColor: "#10B981",
                darkMode: true,
                fontFamily: "inter",
                borderRadius: "2xl"
            },
            hero: {
                name: parsedData.hero?.name || "Your Name",
                title: parsedData.hero?.title || "Developer",
                tagline: parsedData.hero?.tagline || "Building",
                taglineHighlight: parsedData.hero?.taglineHighlight || "Amazing Things",
                subtitle: parsedData.hero?.subtitle || "Welcome to my portfolio",
                availableForWork: true,
                availableText: "Available for work",
                ctaText: "View My Work",
                showAnimation: true
            },
            about: {
                initials: parsedData.about?.initials || "YN",
                fullName: parsedData.about?.fullName || parsedData.hero?.name || "Your Name",
                role: parsedData.about?.role || parsedData.hero?.title || "Developer",
                location: parsedData.about?.location || "Location",
                email: parsedData.about?.email || parsedData.contact?.email || "email@example.com",
                bio: parsedData.about?.bio || "Professional bio",
                skills: parsedData.about?.skills || ["JavaScript", "React", "Node.js"],
                experiences: (parsedData.experiences || []).map((exp, i) => ({
                    id: String(i + 1),
                    title: exp.title || "Position",
                    company: exp.company || "Company",
                    companyUrl: exp.companyUrl || "",
                    startDate: exp.startDate || "2020",
                    endDate: exp.endDate || "Present",
                    current: exp.current || exp.endDate === "Present",
                    highlights: exp.highlights || [],
                    color: ["blue", "purple", "green", "orange"][i % 4]
                }))
            },
            projects: (parsedData.projects || []).map((proj, i) => ({
                id: String(i + 1),
                title: proj.title || "Project",
                description: proj.description || "Project description",
                tags: proj.tags || [],
                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=75",
                demoUrl: proj.demoUrl || "",
                codeUrl: proj.codeUrl || ""
            })),
            contact: {
                headline: "Get in Touch",
                subheadline: "Have a project in mind? Let's build something amazing together.",
                email: parsedData.contact?.email || parsedData.about?.email || "email@example.com",
                showContactForm: true,
                locationText: parsedData.contact?.locationText || parsedData.about?.location || "Location",
                availabilityText: "Available for Remote Work"
            },
            socialLinks: (() => {
                // Combine AI-parsed links with regex-extracted links
                const aiLinks = (parsedData.socialLinks || []).map((link, i) => ({
                    id: String(i + 1),
                    platform: link.platform || "github",
                    url: link.url || "",
                    label: link.label || link.platform
                }));

                // Add regex-extracted links that weren't found by AI
                const allLinks = [...aiLinks];
                extractedLinks.forEach((extracted, i) => {
                    const exists = allLinks.some(l =>
                        l.url.toLowerCase().includes(extracted.platform) ||
                        l.platform === extracted.platform
                    );
                    if (!exists && extracted.url) {
                        allLinks.push({
                            id: String(allLinks.length + 1),
                            platform: extracted.platform,
                            url: extracted.url,
                            label: extracted.label
                        });
                    }
                });

                return allLinks.filter(l => l.url && l.url.length > 0);
            })(),
            footer: {
                text: "Built ",
                showYear: true
            }
        };

        console.log('Resume parsed successfully!');
        res.json({ success: true, config: portfolioConfig });

    } catch (error) {
        console.error('Resume parsing error:', error.message);
        res.status(500).json({ error: 'Failed to parse resume: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

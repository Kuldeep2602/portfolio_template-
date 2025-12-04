const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Octokit } = require('octokit');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 3001;
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const TEMPLATE_OWNER = 'Kuldeep2602';
const TEMPLATE_REPO = 'portfolio_template-';

// Startup log
console.log('Server starting with CLIENT_ID:', CLIENT_ID ? `${CLIENT_ID.substring(0, 8)}...` : 'NOT LOADED');

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
            await octokit.rest.repos.createOrUpdateFileContents({
                owner: username,
                repo: actualRepoName,
                path: '.env',
                message: 'Enable viewer mode',
                content: envContent,
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Portfolio Configuration Types

export interface SocialLink {
  id: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'resume' | 'website' | 'youtube' | 'instagram' | 'dribbble' | 'behance' | 'medium';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
  color: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  darkMode: boolean;
  fontFamily: 'inter' | 'poppins' | 'roboto' | 'playfair' | 'montserrat';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export interface HeroConfig {
  name: string;
  title: string;
  tagline: string;
  taglineHighlight: string;
  subtitle: string;
  availableForWork: boolean;
  availableText: string;
  ctaText: string;
  showAnimation: boolean;
}

export interface AboutConfig {
  initials: string;
  avatarUrl?: string;
  fullName: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  resumeUrl?: string;
  skills: string[];
  experiences: Experience[];
}

export interface ContactConfig {
  headline: string;
  subheadline: string;
  email: string;
  phone?: string;
  calendlyUrl?: string;
  showContactForm: boolean;
  formEndpoint?: string;
  locationText: string;
  availabilityText: string;
}

export interface MetaConfig {
  siteTitle: string;
  siteDescription: string;
  ogImage?: string;
  favicon?: string;
  googleAnalyticsId?: string;
}

export interface PortfolioConfig {
  version: string;
  meta: MetaConfig;
  theme: ThemeConfig;
  hero: HeroConfig;
  about: AboutConfig;
  projects: Project[];
  contact: ContactConfig;
  socialLinks: SocialLink[];
  footer: {
    text: string;
    showYear: boolean;
  };
}

// Default configuration
export const defaultPortfolioConfig: PortfolioConfig = {
  version: '1.0.0',
  meta: {
    siteTitle: 'My Portfolio',
    siteDescription: 'Welcome to my portfolio - showcasing my work and skills',
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981',
    darkMode: true,
    fontFamily: 'inter',
    borderRadius: '2xl',
  },
  hero: {
    name: 'Your Name',
    title: 'Full Stack Developer',
    tagline: 'Crafting Digital',
    taglineHighlight: 'Experiences',
    subtitle: 'Specializing in modern web applications with React, TypeScript, and cutting-edge design systems.',
    availableForWork: true,
    availableText: 'Available for work',
    ctaText: 'View My Work',
    showAnimation: true,
  },
  about: {
    initials: 'YN',
    fullName: 'Your Name',
    role: 'Full Stack Developer',
    location: 'Your City, Country',
    email: 'your@email.com',
    bio: 'Full Stack Developer passionate about creating exceptional digital experiences',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
    experiences: [
      {
        id: '1',
        title: 'Software Developer',
        company: 'Company Name',
        companyUrl: 'https://example.com',
        startDate: '2023',
        endDate: 'Present',
        current: true,
        highlights: [
          'Built and maintained web applications',
          'Collaborated with cross-functional teams',
        ],
        color: 'blue',
      },
    ],
  },
  projects: [
    {
      id: '1',
      title: 'Sample Project',
      description: 'A sample project showcasing my skills in web development.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=75',
      demoUrl: 'https://example.com',
      codeUrl: 'https://github.com/example',
    },
  ],
  contact: {
    headline: 'Get in Touch',
    subheadline: 'Have a project in mind? Let\'s build something amazing together.',
    email: 'your@email.com',
    showContactForm: true,
    locationText: 'Your Location',
    availabilityText: 'Available for Remote Work',
  },
  socialLinks: [
    { id: '1', platform: 'github', url: 'https://github.com', label: 'GitHub' },
    { id: '2', platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { id: '3', platform: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
  ],
  footer: {
    text: 'Built with ❤️',
    showYear: true,
  },
};

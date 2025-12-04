import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Github, Linkedin, Twitter } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FiMail, FiMapPin, FiExternalLink } from 'react-icons/fi';

interface LivePreviewProps {
  section: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ section }) => {
  const { config } = usePortfolio();
  const { hero, about, projects, contact, socialLinks, theme } = config;

  // Get icon for social link
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'resume': return FileText;
      default: return FiExternalLink;
    }
  };

  const renderHeroPreview = () => (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {hero.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{hero.title}</p>
      </motion.div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-gray-200 dark:border-gray-700">
        {hero.availableForWork && (
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-white/10 px-2 py-1 rounded-full">
              {hero.availableText}
            </span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Crafting Digital{' '}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})`
            }}
          >
            Experiences
          </span>
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {hero.subtitle}
        </p>

        <div className="flex flex-wrap gap-2">
          {socialLinks.slice(0, 4).map((link) => {
            const Icon = getSocialIcon(link.platform);
            return (
              <span
                key={link.id}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-white/60 dark:bg-white/10 text-gray-700 dark:text-gray-300"
              >
                <Icon className="w-3 h-3" />
                {link.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAboutPreview = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">About Me</h2>
      
      <div className="flex flex-col items-center mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
        <div
          className="w-16 h-16 rounded-full mb-3 flex items-center justify-center text-white text-xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
          }}
        >
          {about.initials}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{about.fullName}</h3>
        <span
          className="text-sm px-3 py-1 rounded-full mt-1"
          style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
        >
          {about.role}
        </span>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <FiMapPin className="w-3 h-3" />
          {about.location}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-1">
          {about.skills.slice(0, 8).map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {skill}
            </span>
          ))}
          {about.skills.length > 8 && (
            <span className="text-xs text-gray-500">+{about.skills.length - 8} more</span>
          )}
        </div>
      </div>

      {about.experiences.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</h4>
          <div className="space-y-2">
            {about.experiences.slice(0, 2).map((exp) => (
              <div
                key={exp.id}
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm"
              >
                <p className="font-medium text-gray-900 dark:text-white">{exp.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {exp.company} • {exp.startDate} - {exp.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProjectsPreview = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Projects</h2>
      
      <div className="space-y-4">
        {projects.slice(0, 3).map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex gap-3">
              {project.image && (
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  {project.description}
                </p>
                <div className="flex gap-1 mt-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No projects added yet
        </div>
      )}
    </div>
  );

  const renderContactPreview = () => (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{contact.headline}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{contact.subheadline}</p>
      </div>

      <div className="space-y-3 mb-6">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="p-2 rounded-lg bg-white dark:bg-gray-700">
            <FiMail className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">{contact.email}</span>
        </a>
      </div>

      {contact.showContactForm && (
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-3">
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
            disabled
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
            disabled
          />
          <textarea
            placeholder="Your message"
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm resize-none"
            disabled
          />
          <button
            className="w-full py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: theme.primaryColor }}
            disabled
          >
            Send Message
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        {contact.locationText} • {contact.availabilityText}
      </div>
    </div>
  );

  const renderSocialPreview = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Connect</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((link) => {
          const Icon = getSocialIcon(link.platform);
          return (
            <div
              key={link.id}
              className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
            >
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {link.label}
              </span>
            </div>
          );
        })}
      </div>

      {socialLinks.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No social links added yet
        </div>
      )}
    </div>
  );

  const renderThemePreview = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Theme Preview</h2>
      
      <div className="space-y-4">
        {/* Color Swatches */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div
              className="w-full h-16 rounded-xl mb-2"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <span className="text-xs text-gray-500">Primary</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-16 rounded-xl mb-2"
              style={{ backgroundColor: theme.secondaryColor }}
            />
            <span className="text-xs text-gray-500">Secondary</span>
          </div>
          <div className="text-center">
            <div
              className="w-full h-16 rounded-xl mb-2"
              style={{ backgroundColor: theme.accentColor }}
            />
            <span className="text-xs text-gray-500">Accent</span>
          </div>
        </div>

        {/* Gradient */}
        <div
          className="h-24 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
          }}
        >
          <span className="text-white font-bold text-lg">Gradient</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Primary
          </button>
          <button
            className="flex-1 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: theme.secondaryColor }}
          >
            Secondary
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettingsPreview = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Site Preview</h2>
      
      <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gray-300 dark:bg-gray-600" />
          <div className="flex-1">
            <div className="h-3 w-32 rounded bg-gray-300 dark:bg-gray-600 mb-1" />
            <div className="h-2 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-gray-900 text-center">
        <p className="text-sm text-gray-400">
          {config.footer.text} {config.footer.showYear && `© ${new Date().getFullYear()}`}
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{config.meta.siteTitle}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{config.meta.siteDescription}</p>
      </div>
    </div>
  );

  switch (section) {
    case 'hero':
      return renderHeroPreview();
    case 'about':
      return renderAboutPreview();
    case 'projects':
      return renderProjectsPreview();
    case 'contact':
      return renderContactPreview();
    case 'social':
      return renderSocialPreview();
    case 'theme':
      return renderThemePreview();
    case 'settings':
      return renderSettingsPreview();
    default:
      return renderHeroPreview();
  }
};

export default LivePreview;

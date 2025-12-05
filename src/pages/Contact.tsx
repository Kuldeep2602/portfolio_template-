import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiPhone, FiCalendar, FiTrash2, FiTwitter, FiInstagram, FiYoutube, FiExternalLink, FiFileText, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import InlineEdit from '../components/InlineEdit';
import { EditModal } from '../components/EditableWrapper';
import type { SocialLink } from '../types/portfolio';

const Contact = () => {
  const { config, updateContact, updateAbout, updateSocialLinks, isEditorMode } = usePortfolio();
  const { contact, theme, socialLinks, about } = config;
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState<Partial<SocialLink>>({ platform: 'github', label: '', url: '' });

  const handleDeleteSocialLink = (id: string) => {
    updateSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.label && newSocialLink.url) {
      const link: SocialLink = {
        id: Date.now().toString(),
        platform: newSocialLink.platform || 'website',
        label: newSocialLink.label,
        url: newSocialLink.url
      };
      updateSocialLinks([...socialLinks, link]);
      setNewSocialLink({ platform: 'github', label: '', url: '' });
      setShowAddSocialModal(false);
    }
  };

  // Get icon for platform
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return FiLinkedin;
      case 'github': return FiGithub;
      case 'twitter': return FiTwitter;
      case 'instagram': return FiInstagram;
      case 'youtube': return FiYoutube;
      case 'resume': return FiFileText;
      default: return FiExternalLink;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="mb-6 md:mb-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight text-glow transition-colors duration-300">Get in Touch</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light transition-colors duration-300">
              {isEditorMode ? (
                <InlineEdit
                  value={contact.headline || "Have a project in mind? Let's build something amazing together."}
                  onSave={(value) => updateContact({ headline: value })}
                  className="text-gray-600 dark:text-gray-400 text-lg font-light"
                  placeholder="Add a headline..."
                />
              ) : (
                contact.headline || "Have a project in mind? Let's build something amazing together."
              )}
            </p>
          </div>

          {/* Single centered card with glass effect */}
          <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/50 dark:border-white/10 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base mb-6 font-light leading-relaxed transition-colors duration-300">
              Feel free to reach out for collaborations, opportunities, or just a friendly hello!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email - No delete */}
              <div className="flex items-center text-base font-medium text-gray-600 dark:text-gray-300 group">
                <div
                  className="p-3 rounded-xl mr-4 border shadow-sm flex-shrink-0 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                  style={{
                    borderColor: `${theme.primaryColor}30`
                  }}
                >
                  <FiMail size={20} style={{ color: theme.primaryColor }} />
                </div>
                {isEditorMode ? (
                  <InlineEdit
                    value={contact.email}
                    onSave={(value) => updateContact({ email: value })}
                    className="text-base font-medium text-gray-600 dark:text-gray-300"
                    placeholder="your@email.com"
                  />
                ) : (
                  <a href={`mailto:${contact.email}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                    {contact.email}
                  </a>
                )}
              </div>

              {/* Phone - With delete */}
              <div className="flex items-center text-base font-medium text-gray-600 dark:text-gray-300 group">
                <div
                  className="p-3 rounded-xl mr-4 border shadow-sm flex-shrink-0 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                  style={{
                    borderColor: `${theme.primaryColor}30`
                  }}
                >
                  <FiPhone size={20} style={{ color: theme.primaryColor }} />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  {isEditorMode ? (
                    <>
                      <InlineEdit
                        value={contact.phone || ''}
                        onSave={(value) => updateContact({ phone: value })}
                        className="text-base font-medium text-gray-600 dark:text-gray-300"
                        placeholder="Add phone number..."
                      />
                      {contact.phone && (
                        <button
                          onClick={() => updateContact({ phone: '' })}
                          className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete phone"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      )}
                    </>
                  ) : contact.phone ? (
                    <a href={`tel:${contact.phone}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                      {contact.phone}
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Calendly - With delete */}
              <div className="flex items-center text-base font-medium text-gray-600 dark:text-gray-300 group">
                <div
                  className="p-3 rounded-xl mr-4 border shadow-sm flex-shrink-0 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                  style={{
                    borderColor: `${theme.secondaryColor}30`
                  }}
                >
                  <FiCalendar size={20} style={{ color: theme.secondaryColor }} />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  {isEditorMode ? (
                    <>
                      <InlineEdit
                        value={contact.calendlyUrl || ''}
                        onSave={(value) => updateContact({ calendlyUrl: value })}
                        className="text-base font-medium text-gray-600 dark:text-gray-300"
                        placeholder="Add Calendly URL..."
                      />
                      {contact.calendlyUrl && (
                        <button
                          onClick={() => updateContact({ calendlyUrl: '' })}
                          className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Calendly"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      )}
                    </>
                  ) : contact.calendlyUrl ? (
                    <a href={contact.calendlyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                      Schedule a Meeting
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            {socialLinks.length > 0 && (
              <div className="mt-6 pt-5 border-t border-gray-200/30 dark:border-white/10">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Social Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {socialLinks.map((link) => {
                    const Icon = getIcon(link.platform);
                    return (
                      <div key={link.id} className="flex items-center justify-between group">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <div
                            className="p-2.5 rounded-xl mr-3 border shadow-sm flex-shrink-0 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                            style={{
                              borderColor: `${theme.primaryColor}30`
                            }}
                          >
                            <Icon size={18} style={{ color: theme.primaryColor }} />
                          </div>
                          {link.label}
                        </a>
                        {isEditorMode && (
                          <button
                            onClick={() => handleDeleteSocialLink(link.id)}
                            className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete link"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Add Social Link Button */}
                {isEditorMode && (
                  <button
                    onClick={() => setShowAddSocialModal(true)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
                  >
                    <FiPlus size={16} /> Add Social Link
                  </button>
                )}
              </div>
            )}

            {/* Show add button even if no social links exist */}
            {socialLinks.length === 0 && isEditorMode && (
              <div className="mt-6 pt-5 border-t border-gray-200/30 dark:border-white/10">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Social Links</h4>
                <button
                  onClick={() => setShowAddSocialModal(true)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  <FiPlus size={16} /> Add Social Link
                </button>
              </div>
            )}

            {/* Location Footer */}
            <div className="mt-6 pt-5 border-t border-gray-200/30 dark:border-white/10">
              <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                Based in {isEditorMode ? (
                  <InlineEdit
                    value={about.location}
                    onSave={(value) => updateAbout({ location: value })}
                    className="text-gray-500 dark:text-gray-400 text-sm"
                    placeholder="Your location"
                  />
                ) : about.location}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add Social Link Modal */}
      <EditModal
        isOpen={showAddSocialModal}
        onClose={() => setShowAddSocialModal(false)}
        title="Add Social Link"
        onSave={handleAddSocialLink}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform</label>
            <select
              value={newSocialLink.platform}
              onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value as SocialLink['platform'] })}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            >
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="resume">Resume</option>
              <option value="website">Website</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
            <input
              type="text"
              value={newSocialLink.label}
              onChange={(e) => setNewSocialLink({ ...newSocialLink, label: e.target.value })}
              placeholder="e.g., My GitHub"
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
            <input
              type="url"
              value={newSocialLink.url}
              onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </EditModal>
    </div>
  );
};

export default Contact;

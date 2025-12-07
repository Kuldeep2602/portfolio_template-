import { Link } from 'react-router-dom';
import { FolderOpen, User, Mail, FileText, Github, Linkedin, Twitter, ExternalLink, Youtube, Instagram, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassBubbleText from '../components/GlassBubbleText';
import TiltCard from '../components/TiltCard';
import { usePortfolio } from '../context/PortfolioContext';
import InlineEdit from '../components/InlineEdit';
import { EditModal, AddButton } from '../components/EditableWrapper';
import type { SocialLink } from '../types/portfolio';

const LandingPage = () => {
  const { config, updateHero, updateSocialLinks, isEditorMode } = usePortfolio();
  const { hero, socialLinks, theme } = config;
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [showEditSocialModal, setShowEditSocialModal] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState<SocialLink | null>(null);
  const [newSocialLink, setNewSocialLink] = useState<Partial<SocialLink>>({ platform: 'github', label: '', url: '' });

  // Get icon for social links
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'resume': return FileText;
      case 'youtube': return Youtube;
      case 'instagram': return Instagram;
      default: return ExternalLink;
    }
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.label && newSocialLink.url) {
      const link: SocialLink = {
        id: Date.now().toString(),
        platform: newSocialLink.platform || 'github',
        label: newSocialLink.label,
        url: newSocialLink.url
      };
      updateSocialLinks([...socialLinks, link]);
      setNewSocialLink({ platform: 'github', label: '', url: '' });
      setShowAddSocialModal(false);
    }
  };

  const handleEditSocialLink = () => {
    if (editingSocialLink) {
      handleUpdateSocialLink(editingSocialLink.id, {
        label: editingSocialLink.label,
        url: editingSocialLink.url
      });
      setShowEditSocialModal(false);
      setEditingSocialLink(null);
    }
  };

  const handleDeleteSocialLink = (id: string) => {
    updateSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const handleUpdateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    updateSocialLinks(socialLinks.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-[75vh] pt-2 md:pt-4 pb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-3" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-2 tracking-tighter text-glow transition-colors duration-300">
          {isEditorMode ? (
            <InlineEdit
              value={hero.name}
              onSave={(value) => updateHero({ name: value })}
              className="inline-block"
            >
              <GlassBubbleText shimmer>{hero.name}</GlassBubbleText>
            </InlineEdit>
          ) : (
            <GlassBubbleText shimmer>{hero.name}</GlassBubbleText>
          )}
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light tracking-wide transition-colors duration-300">
          {isEditorMode ? (
            <InlineEdit
              value={hero.title}
              onSave={(value) => updateHero({ title: value })}
            >
              {hero.title}
            </InlineEdit>
          ) : (
            hero.title
          )}
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full max-w-5xl">

        {/* Main Card (Spans 2 columns) */}
        <motion.div
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <TiltCard disableTilt={isEditorMode} className="h-full glass-bubble-card-glow bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl min-h-[260px] relative overflow-hidden group">
            <div className="flex flex-col justify-between h-full w-full p-6 md:p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

              {/* Available Badge */}
              {hero.availableForWork && (
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  {isEditorMode ? (
                    <InlineEdit
                      value={hero.availableText}
                      onSave={(value) => updateHero({ availableText: value })}
                      className="bg-white/60 dark:bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-white/40 dark:border-white/10 shadow-sm"
                    >
                      {hero.availableText}
                    </InlineEdit>
                  ) : (
                    <span className="bg-white/60 dark:bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-white/40 dark:border-white/10 shadow-sm transition-colors duration-300">
                      {hero.availableText}
                    </span>
                  )}
                </div>
              )}

              {/* Main Content */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight transition-colors duration-300">
                  {isEditorMode ? (
                    <InlineEdit
                      value={hero.tagline || 'Crafting Digital'}
                      onSave={(value) => updateHero({ tagline: value })}
                      className="block"
                    >
                      {hero.tagline || 'Crafting Digital'}
                    </InlineEdit>
                  ) : (
                    <>{hero.tagline || 'Crafting Digital'}</>
                  )}
                  <br />
                  <GlassBubbleText shimmer>
                    {isEditorMode ? (
                      <InlineEdit
                        value={hero.taglineHighlight || 'Experiences'}
                        onSave={(value) => updateHero({ taglineHighlight: value })}
                        className="inline-block"
                      >
                        <span 
                          className="text-transparent bg-clip-text bg-gradient-to-r"
                          style={{ backgroundImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                        >
                          {hero.taglineHighlight || 'Experiences'}
                        </span>
                      </InlineEdit>
                    ) : (
                      <span 
                        className="text-transparent bg-clip-text bg-gradient-to-r"
                        style={{ backgroundImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})` }}
                      >
                        {hero.taglineHighlight || 'Experiences'}
                      </span>
                    )}
                  </GlassBubbleText>
                </h2>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light max-w-md leading-relaxed transition-colors duration-300">
                  {isEditorMode ? (
                    <InlineEdit
                      value={hero.subtitle}
                      onSave={(value) => updateHero({ subtitle: value })}
                      multiline
                    >
                      {hero.subtitle}
                    </InlineEdit>
                  ) : (
                    hero.subtitle
                  )}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 mt-5 relative z-10">
                {socialLinks.map((link) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <div key={link.id} className="relative group/social">
                      {isEditorMode ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingSocialLink(link);
                              setShowEditSocialModal(true);
                            }}
                            className="glass-bubble-button bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm rounded-xl flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 px-3 py-2 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span>{link.label}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSocialLink(link.id)}
                            className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
                            title="Delete link"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-bubble-button bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm rounded-xl flex items-center justify-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 transition-all duration-300"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <Icon className="w-4 h-4" /> {link.label}
                        </a>
                      )}
                    </div>
                  );
                })}
                {isEditorMode && (
                  <button
                    onClick={() => setShowAddSocialModal(true)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Link
                  </button>
                )}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Right Column Stack */}
        <div className="flex flex-col gap-4">

          {/* Projects Card */}
          <Link to="/projects" className="flex-1 block">
            <motion.div variants={itemVariants} className="h-full">
              <TiltCard disableTilt={isEditorMode} className="glass-bubble-card bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl h-full group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center h-full w-full p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <FolderOpen className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                    <GlassBubbleText>Projects</GlassBubbleText>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">View my work</p>
                </div>
              </TiltCard>
            </motion.div>
          </Link>

          {/* About Card */}
          <Link to="/about" className="flex-1 block">
            <motion.div variants={itemVariants} className="h-full">
              <TiltCard disableTilt={isEditorMode} className="glass-bubble-card bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl h-full group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center h-full w-full p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <User className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                    <GlassBubbleText>About</GlassBubbleText>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Learn more</p>
                </div>
              </TiltCard>
            </motion.div>
          </Link>

          {/* Contact Card */}
          <Link to="/contact" className="flex-1 block">
            <motion.div variants={itemVariants} className="h-full">
              <TiltCard disableTilt={isEditorMode} className="glass-bubble-card bg-orange-50/80 dark:bg-orange-900/20 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl dark:shadow-none rounded-3xl h-full group relative overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center h-full w-full p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Mail className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                    <GlassBubbleText>Contact</GlassBubbleText>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Get in touch</p>
                </div>
              </TiltCard>
            </motion.div>
          </Link>
        </div>
      </div>

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
              onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
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

      {/* Edit Social Link Modal */}
      <EditModal
        isOpen={showEditSocialModal}
        onClose={() => {
          setShowEditSocialModal(false);
          setEditingSocialLink(null);
        }}
        title="Edit Social Link"
        onSave={handleEditSocialLink}
      >
        {editingSocialLink && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
              <input
                type="text"
                value={editingSocialLink.label}
                onChange={(e) => setEditingSocialLink({ ...editingSocialLink, label: e.target.value })}
                placeholder="e.g., My GitHub"
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
              <input
                type="url"
                value={editingSocialLink.url}
                onChange={(e) => setEditingSocialLink({ ...editingSocialLink, url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </EditModal>
    </motion.div>
  );
};

export default LandingPage;

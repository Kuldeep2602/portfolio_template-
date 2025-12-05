import { motion } from 'framer-motion';
import { FiExternalLink, FiArrowRight, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassBubbleText from '../components/GlassBubbleText';
import { usePortfolio } from '../context/PortfolioContext';
import InlineEdit from '../components/InlineEdit';
import { EditModal } from '../components/EditableWrapper';
import type { Project } from '../types/portfolio';

const Work: React.FC = () => {
  const { config, updateProjects, updateConfig, isEditorMode } = usePortfolio();
  const { projects, theme } = config;
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    tags: [],
    demoUrl: '',
    codeUrl: ''
  });
  const [newTag, setNewTag] = useState('');

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title || '',
        description: newProject.description || '',
        image: newProject.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=75',
        tags: newProject.tags || [],
        demoUrl: newProject.demoUrl,
        codeUrl: newProject.codeUrl
      };
      updateProjects([...projects, project]);
      setNewProject({ title: '', description: '', image: '', tags: [], demoUrl: '', codeUrl: '' });
      setShowAddProjectModal(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    updateProjects(projects.filter(p => p.id !== id));
  };

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    updateProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleAddTag = () => {
    if (newTag.trim() && newProject.tags) {
      setNewProject({ ...newProject, tags: [...newProject.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Navigation */}
      <nav className="py-4 px-4 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 dark:text-white mb-3">
            <GlassBubbleText shimmer>My Projects</GlassBubbleText>
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 font-light">
            {isEditorMode ? (
              <InlineEdit
                value={config.meta?.siteDescription || 'A showcase of my recent work'}
                onSave={(value) => updateConfig({ meta: { ...config.meta, siteDescription: value } })}
                placeholder="Add a description..."
              >
                {config.meta?.siteDescription || 'A showcase of my recent work'}
              </InlineEdit>
            ) : (
              config.meta?.siteDescription || 'A showcase of my recent work'
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group/project relative"
            >
              <div className="glass-bubble-card bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl border border-white/50 dark:border-white/10 p-6 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-2/5 flex-shrink-0 overflow-hidden rounded-xl h-48 relative">
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=75'}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-xl transform group-hover/project:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=75'; }}
                    />
                    {isEditorMode && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/project:opacity-100 transition-opacity flex items-center justify-center">
                        <InlineEdit
                          value={project.image}
                          onSave={(value) => handleUpdateProject(project.id, { image: value })}
                          placeholder="Image URL"
                          className="text-white text-xs"
                        >
                          <span className="text-white text-xs bg-white/20 px-2 py-1 rounded">Change Image URL</span>
                        </InlineEdit>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-3/5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2 py-1 rounded-full border backdrop-blur-sm"
                          style={{
                            color: theme.primaryColor,
                            backgroundColor: `${theme.primaryColor}15`,
                            borderColor: `${theme.primaryColor}30`
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-3 group-hover/project:text-blue-600 dark:group-hover/project:text-blue-400 transition-colors">
                      {isEditorMode ? (
                        <InlineEdit
                          value={project.title}
                          onSave={(value) => handleUpdateProject(project.id, { title: value })}
                        >
                          <GlassBubbleText>{project.title}</GlassBubbleText>
                        </InlineEdit>
                      ) : (
                        <GlassBubbleText>{project.title}</GlassBubbleText>
                      )}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {isEditorMode ? (
                        <InlineEdit
                          value={project.description}
                          onSave={(value) => handleUpdateProject(project.id, { description: value })}
                          multiline
                        >
                          {project.description}
                        </InlineEdit>
                      ) : (
                        <span className="line-clamp-3">{project.description}</span>
                      )}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Code URL */}
                      {isEditorMode ? (
                        <div className="flex items-center gap-2">
                          <InlineEdit
                            value={project.codeUrl || ''}
                            onSave={(value) => handleUpdateProject(project.id, { codeUrl: value })}
                            placeholder="Add Code URL..."
                            className="text-sm"
                          >
                            <span className="glass-bubble-button inline-flex items-center bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium shadow-md rounded-lg px-4 py-2 gap-2 text-sm transition-all duration-300 backdrop-blur-md border border-white/40 dark:border-white/20">
                              <FiArrowRight className="w-4 h-4" />
                              {project.codeUrl ? 'Code' : 'Add Code URL'}
                            </span>
                          </InlineEdit>
                          {project.codeUrl && (
                            <button
                              onClick={() => handleUpdateProject(project.id, { codeUrl: '' })}
                              className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                              title="Remove Code URL"
                            >
                              <FiTrash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ) : project.codeUrl ? (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-bubble-button inline-flex items-center bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium shadow-md rounded-lg px-4 py-2 gap-2 text-sm transition-all duration-300 backdrop-blur-md border border-white/40 dark:border-white/20"
                        >
                          <FiArrowRight className="w-4 h-4" /> Code
                        </a>
                      ) : null}

                      {/* Demo URL */}
                      {isEditorMode ? (
                        <div className="flex items-center gap-2">
                          <InlineEdit
                            value={project.demoUrl || ''}
                            onSave={(value) => handleUpdateProject(project.id, { demoUrl: value })}
                            placeholder="Add Demo URL..."
                            className="text-sm"
                          >
                            <span
                              className="inline-flex items-center font-medium shadow-md rounded-lg px-4 py-2 gap-2 text-sm transition-all duration-300 backdrop-blur-md border"
                              style={{
                                backgroundColor: `${theme.primaryColor}20`,
                                color: theme.primaryColor,
                                borderColor: `${theme.primaryColor}30`
                              }}
                            >
                              <FiExternalLink className="w-4 h-4" />
                              {project.demoUrl ? 'Demo' : 'Add Demo URL'}
                            </span>
                          </InlineEdit>
                          {project.demoUrl && (
                            <button
                              onClick={() => handleUpdateProject(project.id, { demoUrl: '' })}
                              className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                              title="Remove Demo URL"
                            >
                              <FiTrash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ) : project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-medium shadow-md rounded-lg px-4 py-2 gap-2 text-sm transition-all duration-300 backdrop-blur-md border"
                          style={{
                            backgroundColor: `${theme.primaryColor}20`,
                            color: theme.primaryColor,
                            borderColor: `${theme.primaryColor}30`
                          }}
                        >
                          <FiExternalLink className="w-4 h-4" /> Demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {isEditorMode && (
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/project:opacity-100 transition-opacity shadow-lg z-10"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </motion.article>
          ))}

          {/* Add Project Button */}
          {isEditorMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: projects.length * 0.1 }}
            >
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <FiPlus className="w-8 h-8" />
                <span className="font-medium">Add New Project</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Add Project Modal */}
        <EditModal
          isOpen={showAddProjectModal}
          onClose={() => setShowAddProjectModal(false)}
          title="Add New Project"
          onSave={handleAddProject}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="e.g., E-commerce Platform"
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Describe your project..."
                rows={3}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input
                type="url"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newProject.tags?.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a tag"
                  className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Demo URL</label>
                <input
                  type="url"
                  value={newProject.demoUrl}
                  onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Code URL</label>
                <input
                  type="url"
                  value={newProject.codeUrl}
                  onChange={(e) => setNewProject({ ...newProject, codeUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </EditModal>
      </main>
    </div>
  );
};

export default Work;

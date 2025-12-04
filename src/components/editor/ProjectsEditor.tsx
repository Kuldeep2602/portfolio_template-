import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Image, ExternalLink, Code } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../types/portfolio';

const ProjectsEditor: React.FC = () => {
  const { config, updateProjects } = usePortfolio();
  const { projects } = config;
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Describe your project here...',
      tags: ['React', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=75',
      demoUrl: '',
      codeUrl: '',
    };
    updateProjects([newProject, ...projects]);
    setExpandedProject(newProject.id);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    updateProjects(
      projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    );
  };

  const removeProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      updateProjects(projects.filter(project => project.id !== id));
    }
  };

  const addTag = (projectId: string, tag: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project && tag.trim() && !project.tags.includes(tag.trim())) {
      updateProject(projectId, { tags: [...project.tags, tag.trim()] });
    }
  };

  const removeTag = (projectId: string, tagToRemove: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, { tags: project.tags.filter(tag => tag !== tagToRemove) });
    }
  };

  const moveProject = (id: string, direction: 'up' | 'down') => {
    const index = projects.findIndex(p => p.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === projects.length - 1)
    ) {
      return;
    }

    const newProjects = [...projects];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newProjects[index], newProjects[swapIndex]] = [newProjects[swapIndex], newProjects[index]];
    updateProjects(newProjects);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showcase your best work
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
          <Image className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Add your first project to get started
          </p>
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Project Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {project.tags.slice(0, 3).join(', ')}
                      {project.tags.length > 3 && ` +${project.tags.length - 3}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); moveProject(project.id, 'up'); }}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveProject(project.id, 'down'); }}
                    disabled={index === projects.length - 1}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
                  >
                    ↓
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeProject(project.id); }}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedProject === project.id && (
                <div className="p-4 pt-0 space-y-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, { title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Image className="w-4 h-4 inline mr-1" />
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => updateProject(project.id, { image: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tip: Use Unsplash or ImgBB for free image hosting
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        <ExternalLink className="w-4 h-4 inline mr-1" />
                        Demo URL
                      </label>
                      <input
                        type="url"
                        value={project.demoUrl || ''}
                        onChange={(e) => updateProject(project.id, { demoUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        <Code className="w-4 h-4 inline mr-1" />
                        Code URL
                      </label>
                      <input
                        type="url"
                        value={project.codeUrl || ''}
                        onChange={(e) => updateProject(project.id, { codeUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(project.id, tag)}
                            className="hover:text-red-500 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Type a tag and press Enter..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTag(project.id, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsEditor;

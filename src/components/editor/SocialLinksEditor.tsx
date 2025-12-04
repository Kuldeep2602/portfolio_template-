import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SocialLink } from '../../types/portfolio';

const platformOptions: { value: SocialLink['platform']; label: string; icon: string }[] = [
  { value: 'github', label: 'GitHub', icon: '🐙' },
  { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { value: 'twitter', label: 'Twitter/X', icon: '🐦' },
  { value: 'resume', label: 'Resume', icon: '📄' },
  { value: 'website', label: 'Website', icon: '🌐' },
  { value: 'youtube', label: 'YouTube', icon: '📺' },
  { value: 'instagram', label: 'Instagram', icon: '📷' },
  { value: 'dribbble', label: 'Dribbble', icon: '🏀' },
  { value: 'behance', label: 'Behance', icon: '🎨' },
  { value: 'medium', label: 'Medium', icon: '📝' },
];

const SocialLinksEditor: React.FC = () => {
  const { config, updateSocialLinks } = usePortfolio();
  const { socialLinks } = config;

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'website',
      url: '',
      label: 'My Website',
    };
    updateSocialLinks([...socialLinks, newLink]);
  };

  const updateLink = (id: string, updates: Partial<SocialLink>) => {
    updateSocialLinks(
      socialLinks.map(link =>
        link.id === id ? { ...link, ...updates } : link
      )
    );
  };

  const removeLink = (id: string) => {
    updateSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const moveLink = (id: string, direction: 'up' | 'down') => {
    const index = socialLinks.findIndex(l => l.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === socialLinks.length - 1)
    ) {
      return;
    }

    const newLinks = [...socialLinks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];
    updateSocialLinks(newLinks);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Social Links</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add your social media profiles
          </p>
        </div>
        <button
          onClick={addSocialLink}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Link
        </button>
      </div>

      {socialLinks.length === 0 ? (
        <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No social links</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Add your social media profiles to help visitors connect with you
          </p>
          <button
            onClick={addSocialLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Link
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <div
              key={link.id}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
            >
              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab flex-shrink-0" />
              
              <div className="flex-1 grid grid-cols-3 gap-3">
                <select
                  value={link.platform}
                  onChange={(e) => {
                    const platform = e.target.value as SocialLink['platform'];
                    const option = platformOptions.find(o => o.value === platform);
                    updateLink(link.id, { 
                      platform,
                      label: option?.label || platform
                    });
                  }}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {platformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateLink(link.id, { label: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Label"
                />

                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveLink(link.id, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors text-gray-600 dark:text-gray-400"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveLink(link.id, 'down')}
                  disabled={index === socialLinks.length - 1}
                  className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors text-gray-600 dark:text-gray-400"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeLink(link.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinksEditor;

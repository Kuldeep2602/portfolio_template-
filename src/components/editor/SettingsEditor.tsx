import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const SettingsEditor: React.FC = () => {
  const { config, updateMeta, updateConfig } = usePortfolio();
  const { meta, footer } = config;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configure meta information and global settings
        </p>
      </div>

      {/* Meta Information */}
      <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">SEO & Meta</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Site Title
          </label>
          <input
            type="text"
            value={meta.siteTitle}
            onChange={(e) => updateMeta({ siteTitle: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="My Portfolio"
          />
          <p className="text-xs text-gray-500 mt-1">Appears in browser tabs and search results</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Site Description
          </label>
          <textarea
            value={meta.siteDescription}
            onChange={(e) => updateMeta({ siteDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Welcome to my portfolio..."
          />
          <p className="text-xs text-gray-500 mt-1">Used by search engines and social media previews</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            OG Image URL (optional)
          </label>
          <input
            type="url"
            value={meta.ogImage || ''}
            onChange={(e) => updateMeta({ ogImage: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
          />
          <p className="text-xs text-gray-500 mt-1">Image shown when sharing on social media</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Favicon URL (optional)
          </label>
          <input
            type="url"
            value={meta.favicon || ''}
            onChange={(e) => updateMeta({ favicon: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Google Analytics ID (optional)
          </label>
          <input
            type="text"
            value={meta.googleAnalyticsId || ''}
            onChange={(e) => updateMeta({ googleAnalyticsId: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="G-XXXXXXXXXX"
          />
        </div>
      </div>

      {/* Footer Settings */}
      <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">Footer</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Footer Text
          </label>
          <input
            type="text"
            value={footer.text}
            onChange={(e) => updateConfig({ footer: { ...footer, text: e.target.value } })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Built with ❤️"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Show Year
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Display current year in footer
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={footer.showYear}
              onChange={(e) => updateConfig({ footer: { ...footer, showYear: e.target.checked } })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl bg-gray-900 text-center">
        <p className="text-sm text-gray-400">
          {footer.text} {footer.showYear && `© ${new Date().getFullYear()}`}
        </p>
      </div>
    </div>
  );
};

export default SettingsEditor;

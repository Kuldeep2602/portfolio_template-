import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const HeroEditor: React.FC = () => {
  const { config, updateHero } = usePortfolio();
  const { hero } = config;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hero Section</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Customize your landing page header
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={hero.name}
            onChange={(e) => updateHero({ name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Professional Title
          </label>
          <input
            type="text"
            value={hero.title}
            onChange={(e) => updateHero({ title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Full Stack Developer"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tagline / Subtitle
          </label>
          <textarea
            value={hero.subtitle}
            onChange={(e) => updateHero({ subtitle: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Specializing in modern web applications..."
          />
        </div>

        {/* Available for Work */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Available for Work Badge
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Show availability status on your landing page
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hero.availableForWork}
              onChange={(e) => updateHero({ availableForWork: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {hero.availableForWork && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Availability Text
            </label>
            <input
              type="text"
              value={hero.availableText}
              onChange={(e) => updateHero({ availableText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Available for work"
            />
          </div>
        )}

        {/* Show Animation */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Enable Animations
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Show entrance animations
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hero.showAnimation}
              onChange={(e) => updateHero({ showAnimation: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;

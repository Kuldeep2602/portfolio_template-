import React from 'react';
import { Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const colorPresets = [
  { name: 'Blue', primary: '#3B82F6', secondary: '#8B5CF6' },
  { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
  { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
  { name: 'Orange', primary: '#F59E0B', secondary: '#EF4444' },
  { name: 'Pink', primary: '#EC4899', secondary: '#8B5CF6' },
  { name: 'Cyan', primary: '#06B6D4', secondary: '#3B82F6' },
  { name: 'Red', primary: '#EF4444', secondary: '#F59E0B' },
  { name: 'Indigo', primary: '#6366F1', secondary: '#8B5CF6' },
];

const fontOptions = [
  { value: 'inter', label: 'Inter', preview: 'font-sans' },
  { value: 'poppins', label: 'Poppins', preview: 'font-sans' },
  { value: 'roboto', label: 'Roboto', preview: 'font-sans' },
  { value: 'playfair', label: 'Playfair Display', preview: 'font-serif' },
  { value: 'montserrat', label: 'Montserrat', preview: 'font-sans' },
];

const radiusOptions = [
  { value: 'none', label: 'None', class: 'rounded-none' },
  { value: 'sm', label: 'Small', class: 'rounded-sm' },
  { value: 'md', label: 'Medium', class: 'rounded-md' },
  { value: 'lg', label: 'Large', class: 'rounded-lg' },
  { value: 'xl', label: 'Extra Large', class: 'rounded-xl' },
  { value: '2xl', label: '2XL', class: 'rounded-2xl' },
  { value: '3xl', label: '3XL', class: 'rounded-3xl' },
];

const ThemeEditor: React.FC = () => {
  const { config, updateTheme } = usePortfolio();
  const { theme } = config;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Theme Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Customize colors, fonts, and styling
        </p>
      </div>

      {/* Color Presets */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Color Presets
        </label>
        <div className="grid grid-cols-4 gap-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateTheme({ 
                primaryColor: preset.primary, 
                secondaryColor: preset.secondary 
              })}
              className={`relative p-3 rounded-xl border-2 transition-all ${
                theme.primaryColor === preset.primary
                  ? 'border-gray-900 dark:border-white'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex gap-1 mb-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: preset.primary }}
                />
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: preset.secondary }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{preset.name}</span>
              {theme.primaryColor === preset.primary && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white dark:text-gray-900" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom Colors
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Primary</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Secondary</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.secondaryColor}
                onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Accent</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Default to Dark Mode
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Start portfolio in dark mode
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme.darkMode}
            onChange={(e) => updateTheme({ darkMode: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Font Family
        </label>
        <div className="grid grid-cols-1 gap-2">
          {fontOptions.map((font) => (
            <button
              key={font.value}
              onClick={() => updateTheme({ fontFamily: font.value as typeof theme.fontFamily })}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                theme.fontFamily === font.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className={`text-gray-900 dark:text-white ${font.preview}`}>
                {font.label}
              </span>
              {theme.fontFamily === font.value && (
                <Check className="w-5 h-5 text-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Border Radius
        </label>
        <div className="grid grid-cols-7 gap-2">
          {radiusOptions.map((radius) => (
            <button
              key={radius.value}
              onClick={() => updateTheme({ borderRadius: radius.value as typeof theme.borderRadius })}
              className={`flex flex-col items-center gap-2 p-3 border-2 transition-all ${
                theme.fontFamily === radius.value
                  ? 'border-blue-500'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              } ${radius.class}`}
            >
              <div
                className={`w-8 h-8 bg-blue-500 ${radius.class}`}
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">{radius.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Preview
        </label>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` 
              }}
            >
              AB
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Preview Name</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Primary Button
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              Secondary
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: theme.accentColor }}
            >
              Accent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;

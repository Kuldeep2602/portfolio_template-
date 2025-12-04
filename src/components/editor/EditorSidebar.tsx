import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  User, 
  Briefcase, 
  Mail, 
  Settings, 
  Download, 
  RotateCcw,
  Eye,
  EyeOff,
  Home,
  Share2,
  Rocket
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface EditorSidebarProps {
  onExport: () => void;
  onDeploy: () => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ onExport, onDeploy }) => {
  const { 
    activeSection, 
    setActiveSection, 
    isEditorMode, 
    setIsEditorMode,
    resetConfig 
  } = usePortfolio();

  const menuItems = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'social', label: 'Social Links', icon: Share2 },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen fixed left-0 top-0 z-40"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          Portfolio Builder
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Customize your portfolio
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
              activeSection === item.id
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
        {/* Preview Toggle */}
        <button
          onClick={() => setIsEditorMode(!isEditorMode)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          {isEditorMode ? (
            <>
              <Eye className="w-4 h-4" /> Preview Mode
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" /> Edit Mode
            </>
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all changes?')) {
              resetConfig();
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" /> Export
        </button>

        {/* Deploy Button */}
        <button
          onClick={onDeploy}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium shadow-lg shadow-blue-500/20"
        >
          <Rocket className="w-4 h-4" /> Deploy to Vercel
        </button>
      </div>
    </motion.aside>
  );
};

export default EditorSidebar;

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Rocket, Palette, RotateCcw, Eye, EyeOff, ChevronDown, Upload, Github, Star, Undo2, FileText, Loader2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ExportModal from './editor/ExportModal';
import DeployModal from './editor/DeployModal';

const EditorToolbar: React.FC = () => {
  const { config, updateConfig, updateTheme, resetConfig, isEditorMode, setIsEditorMode, canUndo, undo } = usePortfolio();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedConfig = JSON.parse(event.target?.result as string);
          updateConfig(importedConfig);
          alert('Configuration imported successfully!');
        } catch (error) {
          alert('Invalid configuration file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingResume(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/parse-resume`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.config) {
        updateConfig(data.config);
        alert('Resume parsed successfully! Your portfolio has been populated with your information.');
      } else {
        alert('Failed to parse resume: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Resume parsing error:', error);
      alert('Failed to parse resume. Make sure the server is running and has a valid Gemini API key.');
    } finally {
      setIsParsingResume(false);
      if (resumeInputRef.current) {
        resumeInputRef.current.value = '';
      }
    }
  };

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#8B5CF6' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#EC4899' },
    { name: 'Green', primary: '#10B981', secondary: '#3B82F6' },
    { name: 'Orange', primary: '#F59E0B', secondary: '#EF4444' },
    { name: 'Rose', primary: '#F43F5E', secondary: '#EC4899' },
    { name: 'Teal', primary: '#14B8A6', secondary: '#06B6D4' },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-full px-4 py-2 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Edit Mode Toggle */}
          <button
            onClick={() => setIsEditorMode(!isEditorMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${isEditorMode
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
          >
            {isEditorMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isEditorMode ? 'Editing' : 'Preview'}
          </button>

          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

          {/* Color Preset Picker */}
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ background: `linear-gradient(135deg, ${config.theme.primaryColor}, ${config.theme.secondaryColor})` }}
              />
              <Palette className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>

            {showColorPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]"
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Theme Colors</p>
                <div className="grid grid-cols-3 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        updateTheme({ primaryColor: preset.primary, secondaryColor: preset.secondary });
                        setShowColorPicker(false);
                      }}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

          {/* Undo Button */}
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`p-2 rounded-full transition-all ${canUndo
              ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110'
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          {/* Reset All */}
          <button
            onClick={() => {
              if (confirm('Reset all settings to default? This cannot be undone.')) {
                resetConfig();
              }
            }}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-all"
            title="Reset All"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

          {/* Import Resume */}
          <input
            type="file"
            ref={resumeInputRef}
            onChange={handleImportResume}
            accept=".pdf,.docx,.txt"
            className="hidden"
          />
          <button
            onClick={() => resumeInputRef.current?.click()}
            disabled={isParsingResume}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-2 text-sm ${isParsingResume
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-wait'
                : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 hover:scale-105'
              }`}
            title="Import your resume to auto-fill portfolio"
          >
            {isParsingResume ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Parsing...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Resume</span>
              </>
            )}
          </button>

          {/* Hidden: Import Config (kept for backwards compatibility) */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportConfig}
            accept=".json"
            className="hidden"
          />

          {/* GitHub Star Link - Highlighted */}
          <a
            href="https://github.com/Kuldeep2602/portfolio_template-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all hover:scale-105 shadow-md"
            title="Star on GitHub"
          >
            <Github className="w-4 h-4" />
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          </a>

          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

          {/* Export */}
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>

          {/* Deploy */}
          <button
            onClick={() => setShowDeployModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-colors"
          >
            <Rocket className="w-4 h-4" />
            Deploy
          </button>
        </div>
      </motion.div>

      {/* Click outside to close color picker */}
      {showColorPicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowColorPicker(false);
          }}
        />
      )}

      <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
      <DeployModal isOpen={showDeployModal} onClose={() => setShowDeployModal(false)} />
    </>
  );
};

export default EditorToolbar;

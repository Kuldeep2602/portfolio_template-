import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, ExternalLink, Loader2, Check, Copy, Download } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeployStep = 'intro' | 'generating' | 'ready';

const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  const { exportConfig } = usePortfolio();
  const [step, setStep] = useState<DeployStep>('intro');
  const [copied, setCopied] = useState(false);

  const generateDeployableFiles = async () => {
    setStep('generating');
    
    // Create the config as data URL
    const configJson = exportConfig();
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create and download the config file
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setStep('ready');
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(exportConfig());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setStep('intro');
    onClose();
  };

  const openVercel = () => {
    // When users deploy, set viewer mode to true so their portfolio is non-editable
    const vercelUrl = 'https://vercel.com/new/clone?repository-url=https://github.com/Kuldeep2602/portfolio_template-&env=VITE_VIEWER_MODE&envDescription=Set%20to%20true%20for%20production%20portfolio&envLink=https://github.com/Kuldeep2602/portfolio_template-';
    window.open(vercelUrl, '_blank');
  };

  const renderContent = () => {
    switch (step) {
      case 'intro':
        return (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Deploy Your Portfolio
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get your portfolio live in minutes
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={openVercel}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <svg viewBox="0 0 76 65" className="w-6 h-6" fill="black">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium">Deploy to Vercel</p>
                  <p className="text-xs text-gray-400">Recommended • Free hosting</p>
                </div>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={generateDeployableFiles}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Config for Manual Deploy
              </button>
              
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                Download your config and deploy manually
              </p>
            </div>
          </>
        );

      case 'generating':
        return (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Preparing Your Files...
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Generating deployment package
            </p>
          </div>
        );

      case 'ready':
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Config Downloaded! 🎉
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Your portfolio configuration has been downloaded
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Next steps:</p>
              <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
                <li>Fork the portfolio template on GitHub</li>
                <li>Import your config file into the app</li>
                <li>Set VITE_VIEWER_MODE=true in deployment</li>
                <li>Deploy to Vercel or Netlify</li>
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyConfig}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Config'}
              </button>
              <button
                onClick={resetAndClose}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Done
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={step === 'intro' || step === 'ready' ? resetAndClose : undefined}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Deploy Portfolio
              </h2>
              {(step === 'intro' || step === 'ready') && (
                <button
                  onClick={resetAndClose}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {renderContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeployModal;

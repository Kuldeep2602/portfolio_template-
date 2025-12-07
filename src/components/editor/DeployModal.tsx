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

  const handleGitHubDeploy = async () => {
    try {
      setStep('generating');
      
      // Get config from context
      const configString = exportConfig();
      const config = JSON.parse(configString);
      
      // Open GitHub OAuth in popup
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      console.log('Opening GitHub auth at:', `${apiUrl}/auth/github`);
      
      const authWindow = window.open(
        `${apiUrl}/auth/github`,
        'GitHub Auth',
        `width=${width},height=${height},left=${left},top=${top}`
      );
      
      if (!authWindow) {
        alert('Popup was blocked! Please allow popups for this site and try again.');
        setStep('intro');
        return;
      }
      
      // Set up message listener for OAuth callback
      const messageHandler = async (event: MessageEvent) => {
        console.log('Received message:', event.data);
        
        if (event.data.type === 'GITHUB_AUTH_SUCCESS') {
          const { token } = event.data;
          console.log('GitHub auth successful, deploying...');
          
          // Remove listener
          window.removeEventListener('message', messageHandler);
          
          try {
            authWindow?.close();
            
            // Deploy to GitHub
            console.log('Calling deploy API...');
            const response = await fetch(`${apiUrl}/api/deploy`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                token,
                config,
                repoName: `portfolio-${Date.now()}`
              })
            });
            
            const result = await response.json();
            console.log('Deploy result:', result);
            
            if (result.success) {
              // Open Vercel with the new repo
              console.log('Opening Vercel with repo:', result.repoUrl);
              window.open(`https://vercel.com/new/clone?repository-url=${result.repoUrl}`, '_blank');
              setStep('ready');
            } else {
              alert('Deployment failed: ' + (result.error || 'Unknown error'));
              setStep('intro');
            }
          } catch (deployError) {
            console.error('Deploy error:', deployError);
            alert('Deployment failed: ' + (deployError instanceof Error ? deployError.message : 'Unknown error'));
            setStep('intro');
          }
        }
      };
      
      window.addEventListener('message', messageHandler);
      
      // Clean up listener after 5 minutes
      setTimeout(() => {
        window.removeEventListener('message', messageHandler);
      }, 5 * 60 * 1000);
      
    } catch (error) {
      console.error('Deploy initialization error:', error);
      alert('Failed to start deployment: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setStep('intro');
    }
  };
  
  const openVercel = () => {
    handleGitHubDeploy();
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
              Connecting to GitHub...
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Creating your portfolio repository
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
              Repository Created! 🎉
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Your portfolio has been deployed to GitHub with viewer mode enabled
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">What happened:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✅ Created your portfolio repository on GitHub</li>
                <li>✅ Added your customized configuration</li>
                <li>✅ Enabled viewer mode (no editing toolbar)</li>
                <li>✅ Opened Vercel for deployment</li>
              </ul>
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

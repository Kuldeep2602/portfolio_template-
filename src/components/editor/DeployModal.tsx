import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Loader2, Check, Github, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeployStep = 'intro' | 'auth' | 'deploying' | 'success' | 'error';

const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  const { exportConfig, config } = usePortfolio();
  const [step, setStep] = useState<DeployStep>('intro');
  const [error, setError] = useState('');
  const [deployUrl, setDeployUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [githubToken, setGithubToken] = useState('');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'GITHUB_AUTH_SUCCESS' && event.data.token) {
        setGithubToken(event.data.token);
        handleDeploy(event.data.token);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const startAuth = () => {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      'http://localhost:3001/auth/github',
      'GitHub Auth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleDeploy = async (token: string) => {
    setStep('deploying');
    try {
      const response = await fetch('http://localhost:3001/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          config: JSON.parse(exportConfig()),
          repoName: `portfolio-${config.about.fullName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Deployment failed');
      }

      setDeployUrl(data.deployUrl);
      setRepoUrl(data.repoUrl);
      setStep('success');
    } catch (err: any) {
      setError(err.message);
      setStep('error');
    }
  };

  const resetAndClose = () => {
    setStep('intro');
    setError('');
    onClose();
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
                Create a GitHub repository and deploy to Vercel in one click.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={startAuth}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">Connect GitHub & Deploy</span>
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              This will fork the template and save your configuration to a new repository in your GitHub account.
            </p>
          </>
        );

      case 'deploying':
        return (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Setting up Repository...
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Forking template and saving your changes
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Repository Created! 🎉
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Your portfolio code is ready on GitHub.
            </p>

            <div className="space-y-3">
              <a
                href={deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-medium"
              >
                <svg viewBox="0 0 76 65" className="w-5 h-5" fill="white">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                Finalize on Vercel
              </a>

              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                <Github className="w-5 h-5" />
                View Repository
              </a>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h3>
            <p className="text-red-500 mb-6">
              {error}
            </p>
            <button
              onClick={() => setStep('intro')}
              className="px-6 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
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
          onClick={step === 'intro' || step === 'success' ? resetAndClose : undefined}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Deploy Portfolio
              </h2>
              {(step === 'intro' || step === 'success' || step === 'error') && (
                <button
                  onClick={resetAndClose}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
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

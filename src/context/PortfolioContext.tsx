import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioConfig } from '../types/portfolio';
import { defaultPortfolioConfig } from '../types/portfolio';

interface PortfolioContextType {
  config: PortfolioConfig;
  updateConfig: (updates: Partial<PortfolioConfig>) => void;
  updateHero: (updates: Partial<PortfolioConfig['hero']>) => void;
  updateAbout: (updates: Partial<PortfolioConfig['about']>) => void;
  updateTheme: (updates: Partial<PortfolioConfig['theme']>) => void;
  updateContact: (updates: Partial<PortfolioConfig['contact']>) => void;
  updateMeta: (updates: Partial<PortfolioConfig['meta']>) => void;
  updateProjects: (projects: PortfolioConfig['projects']) => void;
  updateSocialLinks: (links: PortfolioConfig['socialLinks']) => void;
  resetConfig: () => void;
  loadConfig: (config: PortfolioConfig) => void;
  exportConfig: () => string;
  isEditorMode: boolean;
  setIsEditorMode: (mode: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  canUndo: boolean;
  undo: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Load config from localStorage if available
import portfolioConfig from '../portfolio.config.json';

// Load config from localStorage if available, or use the JSON file if present (for deployed sites)
const loadFromStorage = (): PortfolioConfig => {
  // Check if the JSON file has valid data (it will be empty {} in the template)
  if (portfolioConfig && Object.keys(portfolioConfig).length > 0) {
    // If we have a config file, use it! This means we are likely in a deployed environment
    // where the user has injected their config.
    // We still merge with default to be safe.
    const parsed = portfolioConfig as Partial<PortfolioConfig>;
    return {
      ...defaultPortfolioConfig,
      ...parsed,
      meta: { ...defaultPortfolioConfig.meta, ...(parsed.meta || {}) },
      theme: { ...defaultPortfolioConfig.theme, ...(parsed.theme || {}) },
      hero: { ...defaultPortfolioConfig.hero, ...(parsed.hero || {}) },
      about: { ...defaultPortfolioConfig.about, ...(parsed.about || {}) },
      contact: { ...defaultPortfolioConfig.contact, ...(parsed.contact || {}) },
      footer: { ...defaultPortfolioConfig.footer, ...(parsed.footer || {}) },
      projects: parsed.projects || defaultPortfolioConfig.projects,
      socialLinks: parsed.socialLinks || defaultPortfolioConfig.socialLinks,
    };
  }

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio-config');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Deep merge with default config to ensure all fields exist
        return {
          ...defaultPortfolioConfig,
          ...parsed,
          meta: { ...defaultPortfolioConfig.meta, ...(parsed.meta || {}) },
          theme: { ...defaultPortfolioConfig.theme, ...(parsed.theme || {}) },
          hero: { ...defaultPortfolioConfig.hero, ...(parsed.hero || {}) },
          about: { ...defaultPortfolioConfig.about, ...(parsed.about || {}) },
          contact: { ...defaultPortfolioConfig.contact, ...(parsed.contact || {}) },
          footer: { ...defaultPortfolioConfig.footer, ...(parsed.footer || {}) },
          // Arrays are replaced, not merged
          projects: parsed.projects || defaultPortfolioConfig.projects,
          socialLinks: parsed.socialLinks || defaultPortfolioConfig.socialLinks,
        };
      } catch {
        return defaultPortfolioConfig;
      }
    }
  }
  return defaultPortfolioConfig;
};

// Save config to localStorage
const saveToStorage = (config: PortfolioConfig) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-config', JSON.stringify(config));
  }
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PortfolioConfig>(loadFromStorage);
  const [isEditorMode, setIsEditorMode] = useState(true); // Default to edit mode
  const [activeSection, setActiveSection] = useState('hero');
  const historyRef = useRef<PortfolioConfig[]>([]);
  const maxHistory = 20; // Keep last 20 states for undo

  // Save to history before making changes
  const saveToHistory = useCallback((currentConfig: PortfolioConfig) => {
    historyRef.current = [...historyRef.current.slice(-maxHistory + 1), currentConfig];
  }, []);

  const canUndo = historyRef.current.length > 0;

  const undo = useCallback(() => {
    if (historyRef.current.length > 0) {
      const previousConfig = historyRef.current.pop()!;
      setConfig(previousConfig);
      saveToStorage(previousConfig);
    }
  }, []);

  const updateConfig = useCallback((updates: Partial<PortfolioConfig>) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, ...updates };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const updateHero = useCallback((updates: Partial<PortfolioConfig['hero']>) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, hero: { ...prev.hero, ...updates } };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const updateAbout = useCallback((updates: Partial<PortfolioConfig['about']>) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, about: { ...prev.about, ...updates } };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const updateTheme = useCallback((updates: Partial<PortfolioConfig['theme']>) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, theme: { ...prev.theme, ...updates } };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const updateContact = useCallback((updates: Partial<PortfolioConfig['contact']>) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, contact: { ...prev.contact, ...updates } };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const updateMeta = useCallback((updates: Partial<PortfolioConfig['meta']>) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, meta: { ...prev.meta, ...updates } };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const updateProjects = useCallback((projects: PortfolioConfig['projects']) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, projects };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const updateSocialLinks = useCallback((socialLinks: PortfolioConfig['socialLinks']) => {
    setConfig(prev => {
      saveToHistory(prev);
      const newConfig = { ...prev, socialLinks };
      saveToStorage(newConfig);
      return newConfig;
    });
  }, [saveToHistory]);

  const resetConfig = useCallback(() => {
    setConfig(prev => {
      saveToHistory(prev);
      saveToStorage(defaultPortfolioConfig);
      return defaultPortfolioConfig;
    });
  }, [saveToHistory]);

  const loadConfig = useCallback((newConfig: PortfolioConfig) => {
    setConfig(newConfig);
    saveToStorage(newConfig);
  }, []);

  const exportConfig = useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  return (
    <PortfolioContext.Provider
      value={{
        config,
        updateConfig,
        updateHero,
        updateAbout,
        updateTheme,
        updateContact,
        updateMeta,
        updateProjects,
        updateSocialLinks,
        resetConfig,
        loadConfig,
        exportConfig,
        isEditorMode,
        setIsEditorMode,
        activeSection,
        setActiveSection,
        canUndo,
        undo,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

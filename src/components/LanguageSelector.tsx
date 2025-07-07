import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../config/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
        <Globe size={16} className="text-purple-400" />
        <div className="flex items-center gap-1">
          <button
            onClick={() => onLanguageChange('zh')}
            className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
              currentLanguage === 'zh'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/30'
            }`}
          >
            中文
          </button>
          <div className="w-px h-3 bg-slate-600"></div>
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
              currentLanguage === 'en'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/30'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}; 
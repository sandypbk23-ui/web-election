import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ne' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-election-red rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-xl">🇳🇵</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-election-blue to-election-red bg-clip-text text-transparent">
              {t('title')}
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all"
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <button 
                onClick={toggleLanguage}
                className="px-3 py-1 text-sm font-semibold rounded-full hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center gap-1"
                title="Toggle Language"
              >
                <Globe className="w-4 h-4 text-election-blue" />
                {i18n.language === 'en' ? 'नेपाली' : 'English'}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300">
                {isMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-all font-medium"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-all font-medium"
            >
              <Globe className="w-5 h-5 text-election-blue" />
              {i18n.language === 'en' ? 'नेपालीमा हेर्नुहोस्' : 'View in English'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

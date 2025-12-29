import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-700 hover:bg-primary-800 transition"
    >
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? '🇬🇧 EN' : '🇮🇳 हिं'}
      </span>
    </button>
  );
};

export default LanguageToggle;

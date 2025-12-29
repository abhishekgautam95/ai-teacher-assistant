import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} {t('app_name')}. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Empowering Indian teachers with AI technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

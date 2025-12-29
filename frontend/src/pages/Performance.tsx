import React from 'react';
import { useTranslation } from 'react-i18next';

const Performance: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{t('performance')}</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Student performance dashboard coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Performance;

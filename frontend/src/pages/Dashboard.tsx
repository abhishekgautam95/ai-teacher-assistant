import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, link, color }) => {
  return (
    <Link
      to={link}
      className={`block p-6 rounded-lg shadow-md hover:shadow-lg transition-all ${color} text-white`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </Link>
  );
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: t('question_generator'),
      description: 'Generate custom question papers with AI',
      icon: '📝',
      link: '/question-generator',
      color: 'bg-blue-600'
    },
    {
      title: t('notes_generator'),
      description: 'Create student-friendly notes and PPTs',
      icon: '📚',
      link: '/notes-generator',
      color: 'bg-green-600'
    },
    {
      title: t('answer_checker'),
      description: 'Check answer sheets with OCR and AI',
      icon: '✅',
      link: '/answer-checker',
      color: 'bg-purple-600'
    },
    {
      title: t('performance'),
      description: 'Track student progress and analytics',
      icon: '📊',
      link: '/performance',
      color: 'bg-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('welcome')}, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {t('dashboard')} - {t('app_name')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-gray-600">Question Papers</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-gray-600">Notes Created</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">0</p>
              <p className="text-gray-600">Answer Sheets Checked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

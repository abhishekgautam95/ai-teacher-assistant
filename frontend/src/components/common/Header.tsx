import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            {t('app_name')}
          </Link>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            {isAuthenticated && user ? (
              <>
                <Link to="/dashboard" className="hover:text-primary-200">
                  {t('dashboard')}
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition"
                  >
                    {t('logout')}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-700 px-4 py-2 rounded-lg hover:bg-primary-800 transition"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

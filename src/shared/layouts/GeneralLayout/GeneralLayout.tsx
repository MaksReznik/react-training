import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../pages/authentification/components/AuthentificationContext/AuthentificationContext';
import { Roles } from '../../../pages/authentification/enums/Roles.enum';
import css from './GeneralLayout.module.css';

const GeneralLayout = () => {
  const { t, i18n } = useTranslation();
  const { logout, userStatus } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const logoutAndRenavigate = () => {
    logout().then(() => {
      navigate('/');
    });
  };
  return (
    <div className={css.container}>
      <header>
        <div className={css.header__language}>
          Select Language
          <button
            className={css.header__language__button}
            onClick={() => i18n.changeLanguage('en')}
          >
            {' '}
            En
          </button>
          <button
            className={css.header__language__button}
            onClick={() => i18n.changeLanguage('uk')}
          >
            {' '}
            Uk
          </button>
        </div>
        <div className={css.header__info}>
          {userStatus.role === Roles.user &&
            (location.pathname === '/info' ? (
              <span
                className={css.header__info__link}
                onClick={() => navigate(-1)}
              >
                {t('global.backLink')}
              </span>
            ) : (
              <Link className={css.header__info__link} to={'/info'}>
                {t('global.informationLink')}
              </Link>
            ))}
        </div>
        <div className={css.header__logout}>
          {userStatus?.username && (
            <span onClick={logoutAndRenavigate}>
              {t('global.logoutLink')} : {userStatus.username}
            </span>
          )}
        </div>
      </header>
      <main>
        <div className={css.main__container}>
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default GeneralLayout;

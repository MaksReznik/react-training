import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import css from './GeneralLayout.module.css';

const GeneralLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <header>
        <div className={css.header__language}>
          Select Language
          <button onClick={() => i18n.changeLanguage('en')}> En</button>
          <button onClick={() => i18n.changeLanguage('uk')}> Uk</button>
        </div>
        <div className={css.header__info}>
          {location.pathname === '/info' ? (
            <span
              className={css.header__info__link}
              onClick={() => navigate(-1)}
            >
              {t('global.informationBackLink')}
            </span>
          ) : (
            <Link className={css.header__info__link} to={'/info'}>
              {t('global.informationLink')}
            </Link>
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

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import css from './GeneralLayout.module.css';

const GeneralLayout = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={css.container}>
      <header>
        Select Language{' '}
        <button onClick={() => i18n.changeLanguage('en')}>En</button>{' '}
        <button onClick={() => i18n.changeLanguage('uk')}>Uk</button>
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

import React from 'react';
import { Outlet } from 'react-router-dom';
import css from './GeneralLayout.module.css';

const GeneralLayout = () => {
  return (
    <main>
      <div className={css.container}>
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default GeneralLayout;

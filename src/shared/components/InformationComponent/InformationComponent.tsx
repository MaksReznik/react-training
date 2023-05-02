import React from 'react';
import { useTranslation } from 'react-i18next';

const InformationComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h2>{t('information.header')}</h2>
      <p>{t('information.text')}</p>
    </div>
  );
};

export default InformationComponent;

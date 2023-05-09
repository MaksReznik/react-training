import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ContactUsComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <h4> {t('contacts.ourContacts')}</h4>
      <p>+380 00 00 0000</p>
      <span onClick={() => navigate(-1)}>{t('global.backLink')}</span>
    </div>
  );
};

export default ContactUsComponent;

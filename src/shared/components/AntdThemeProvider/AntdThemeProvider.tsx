import { ConfigProvider } from 'antd';
import React from 'react';

const AntdThemeProvider = ({ children }: any) => {
  const theme = {
    token: {
      colorPrimary: '#0f9a9a',
    },
  };
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AntdThemeProvider;

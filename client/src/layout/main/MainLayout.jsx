// MainLayout.js
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import useResponsive from 'hooks/useResponsive';


const MainLayout = ({ children }) => {
  const { Content } = Layout;
  const { isMobile } = useResponsive();
  const isNavMenuClose = false
  return (
    <Layout hasSider style={{ minHeight: '100vh', background: 'transparent' }}>
      <Sidebar />
      {isMobile ? (
        <Layout style={{ marginLeft: 0, minHeight: '100vh', background: 'transparent' }}>
          <Header />
          <Content
            style={{
              margin: '5px auto 0',
              overflow: 'initial',
              width: '100%',
              padding: '0 16px',
              maxWidth: 'none',
              minHeight: 'calc(100vh - 85px)',
              background: 'transparent',
            }}
          >
            {children}
          </Content>
        </Layout>
      ) : (
        <Layout style={{ marginLeft: isNavMenuClose ? 100 : 220, minHeight: '100vh', background: 'transparent' }}>
          <Header />
          <Content
            style={{
              margin: '5px auto 0',
              overflow: 'initial',
              width: '100%',
              padding: '0 16px',
              maxWidth: isNavMenuClose ? 1280 : 1240,
              minHeight: 'calc(100vh - 85px)',
              background: 'transparent',
            }}
          >
            {children}
          </Content>
        </Layout>
      )}
    </Layout>
  );
};

export default MainLayout;

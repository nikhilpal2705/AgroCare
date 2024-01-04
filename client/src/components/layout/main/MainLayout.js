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
    <Layout hasSider>
      <Sidebar />
      {isMobile ? (
        <Layout style={{ marginLeft: 0 }}>
          <Header />
          <Content
            style={{
              margin: '5px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              maxWidth: 'none',
            }}
          >
            {children}
          </Content>
        </Layout>
      ) : (
        <Layout style={{ marginLeft: isNavMenuClose ? 100 : 220 }}>
          <Header />
          <Content
            style={{
              margin: '5px auto 30px',
              overflow: 'initial',
              width: '100%',
              padding: '0 25px',
              maxWidth: isNavMenuClose ? 1200 : 1100,
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

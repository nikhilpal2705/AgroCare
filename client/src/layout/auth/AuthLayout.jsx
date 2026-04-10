import React from 'react';
import { Layout, Row, Col, Divider, Typography } from 'antd';
import SideContent from './SideContent';
import logo from 'assets/images/logo.png';
import Footer from 'layout/main/Footer';
import useResponsive from 'hooks/useResponsive';

const { Content } = Layout;
const { Title } = Typography;

export default function AuthLayout({ children, AUTH_TITLE }) {
  const { isMobile } = useResponsive();
  return (
    <Layout>
      <Row>
        <Col
          xs={{ span: 0, order: 2 }}
          sm={{ span: 0, order: 2 }}
          md={{ span: 11, order: 1 }}
          lg={{ span: 12, order: 1 }}
          style={{ minHeight: '100vh' }}
        >
          <SideContent />
        </Col>

        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 13, order: 2 }}
          lg={{ span: 12, order: 2 }}
          style={{
            minHeight: '100vh',
            background: isMobile ? 'transparent' : '#FFF',
          }}
        >
          <Content
            className="auth-content-wrapper"
            style={{
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            {/* Logo only on small screens */}
            {isMobile && (
              <>
                <img
                  src={logo}
                  alt="AgroCare"
                  style={{
                    margin: '0px auto 0px',
                    display: 'block',
                  }}
                  height={100}
                  width={280}
                />
                <div className="space10" />
              </>
            )}

            <div
              style={isMobile ? {
                background: '#FFF',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              } : {}}
            >
              <Title level={1}>{AUTH_TITLE}</Title>
              <Divider />
              <div className="site-layout-content">{children}</div>
            </div>

            {/* Footer only on mobile */}
            {isMobile && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 'auto',
                  paddingTop: 20,
                  paddingBottom: 0,
                  marginBottom: 0,
                  background: 'transparent',
                }}
              >
                <Footer />
              </div>
            )}
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}

import React from 'react';
import { Layout, Row, Col, Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';
import SideContent from './SideContent';
import logo from '/images/agrocare-logo.svg';
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
            background: isMobile ? 'transparent' : 'rgba(255, 255, 255, 0.45)',
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
                <Link to="/" className="auth-brand-link" style={{ display: 'block' }}>
                  <div className="auth-brand-card">
                    <img src={logo} alt="AgroCare Logo" className="auth-brand-logo" />
                    <div className="auth-brand-text-wrap">
                      <span className="auth-brand-title">AgroCare</span>
                      <span className="auth-brand-subtitle">Smart Farm Console</span>
                    </div>
                  </div>
                </Link>
                <div className="space10" />
              </>
            )}

            <div
              style={isMobile ? {
                background: 'rgba(255, 255, 255, 0.88)',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 18px 46px rgba(21, 46, 36, 0.06)',
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

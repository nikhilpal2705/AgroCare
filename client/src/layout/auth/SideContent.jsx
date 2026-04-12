import React from 'react';
import { Layout, Typography, Divider, Space } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '/images/agrocare-logo.svg';
import Footer from 'layout/main/Footer';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SideContent() {
  return (
    <Content
      style={{
        padding: '100px 30px 30px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <Link
        to="/"
        style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
      >
        <img
          src={logo}
          alt="Agro Care"
          style={{
            margin: '0 auto',
            display: 'block',
            cursor: 'pointer',
          }}
          height={100}
          width={280}
        />
        <Text
          className="auth-brand-text"
          style={{
            display: 'block',
            marginTop: 8,
            fontWeight: 800,
            fontSize: 36,
            lineHeight: 1.1,
            letterSpacing: 0.4,
          }}
        >
          AgroCare
        </Text>
      </Link>
      <Title level={2} style={{ fontSize: 28, marginBottom: 8, textAlign: 'center' }}>
        Companion App for Agriculture
      </Title>

      <Divider style={{ margin: '40px 0' }} />

      <Title level={4} style={{ marginBottom: 24 }}>
        Modern tools to simplify farm management:
      </Title>

      <Space
        direction="vertical"
        size="middle"
        style={{ width: '100%' }}
        className="features-list"
      >
        <Text>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
          Crop Monitoring
        </Text>
        <Text>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
          Inventory Management
        </Text>
        <Text>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
          Irrigation Management
        </Text>
      </Space>

      <Divider style={{ margin: '40px 0' }} />
      <div style={{ textAlign: 'center' }}>
        <Footer />
      </div>
    </Content>
  );
}

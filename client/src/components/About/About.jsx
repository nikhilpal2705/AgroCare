import React from 'react';
import { Result, Avatar, Layout, Button } from 'antd';
import { MailFilled, LinkedinFilled, GithubFilled } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
const DeveloperInfo = ({ name, email, linkedin }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
    <Avatar
      className="last"
      src={null}
      style={{
        cursor: 'default',
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        fontSize: '40px'
      }}
      size={96}
    >
      {name.charAt(0)?.toUpperCase()}
    </Avatar>
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <h5>{name}</h5>
      <p>Full Stack Developer</p>
      <Button
        type="primary"
        shape="round"
        icon={<MailFilled />}
        size=""
        href={`mailto:${email}`}
        style={{ marginBottom: '8px' }} // Add margin-bottom to Email button
      >
        Email
      </Button>
      <Button
        type="primary"
        shape="round"
        icon={<LinkedinFilled />}
        size=""
        href={linkedin}
        target="_blank"
        style={{ marginLeft: '8px' }}
      >
        LinkedIn
      </Button>
    </div>
  </div>
);

const About = () => {
  return (
    <Layout className="site-layout">
      <Result
        status="info"
        title="AgroCare"
        subTitle="Your Agriculture Companion"
        extra={
          <p>
            AgroCare is a comprehensive platform designed to assist and enhance the agricultural experience.
          </p>
        }
      />

      <Content
        className="whiteBox shadow layoutPadding centered-content"
        style={{
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        <h3>Developers</h3>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '25px' }}>
          <div style={{ marginRight: '50px' }}>
            <DeveloperInfo
              name="Nikhil Suryavanshi"
              email="nsuryavanshi.dev@gmail.com"
              linkedin="https://www.linkedin.com/in/nikhilpal2705"
            />
          </div>
          <div style={{ marginLeft: '50px' }}>
            <DeveloperInfo
              name="Jitendra Bakolia"
              email="jitendrabakolia.dev@gmail.com"
              linkedin="https://www.linkedin.com/in/jitendrabakolia"
            />
          </div>
        </div>
      </Content>

      <Content
        className="whiteBox shadow layoutPadding centered-content"
        style={{
          margin: '40px auto',
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        <p>
          Explore our GitHub repository for the AgroCare app to get involved, contribute, or customize the application based on your requirements.
        </p>
        <Button
          type="primary"
          shape="round"
          icon={<GithubFilled />}
          size="large"
          href="https://github.com/nikhilpal2705/AgroCare"
          target="_blank"
        >
          GitHub
        </Button>
      </Content>
    </Layout>
  );
};

export default About;

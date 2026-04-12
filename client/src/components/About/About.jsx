import React from 'react';
import { Avatar, Button } from 'antd';
import { MailFilled, LinkedinFilled, GithubFilled } from '@ant-design/icons';

const developers = [
  {
    name: 'Nikhil Suryavanshi',
    email: 'nsuryavanshi.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/nikhilpal2705',
  },
  {
    name: 'Jitendra Bakolia',
    email: 'jitendrabakolia.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jitendrabakolia',
  },
];

const DeveloperInfo = ({ name, email, linkedin }) => (
  <article className="about-dev-card">
    <Avatar className="about-dev-avatar" src={null} size={88}>
      {name.charAt(0)?.toUpperCase()}
    </Avatar>

    <h3>{name}</h3>
    <p>Full Stack Developer</p>

    <div className="about-dev-actions">
      <Button type="primary" shape="round" icon={<MailFilled />} href={`mailto:${email}`}>
        Email
      </Button>
      <Button shape="round" icon={<LinkedinFilled />} href={linkedin} target="_blank">
        LinkedIn
      </Button>
    </div>
  </article>
);

const About = () => {
  return (
    <section className="about-page">
      <div className="about-shell">
        <section className="about-hero-card">
          <span className="about-kicker">ABOUT AGROCARE</span>
          <h1>AgroCare</h1>
          <p>
            Your agriculture companion. AgroCare helps teams manage crops, irrigation, inventory,
            and pest control in one focused workspace.
          </p>
        </section>

        <section className="about-dev-section">
          <header className="about-dev-header">
            <h2>Developers</h2>
            <p>The people building and maintaining AgroCare.</p>
          </header>

          <div className="about-dev-grid">
            {developers.map((developer) => (
              <DeveloperInfo
                key={developer.email}
                name={developer.name}
                email={developer.email}
                linkedin={developer.linkedin}
              />
            ))}
          </div>
        </section>

        <section className="about-repo-card">
          <div>
            <h3>Open Source Repository</h3>
            <p>
              Explore the codebase, raise issues, and contribute improvements to AgroCare.
            </p>
          </div>
          <Button
            type="primary"
            shape="round"
            icon={<GithubFilled />}
            size="large"
            href="https://github.com/nikhilpal2705/AgroCare"
            target="_blank"
          >
            View on GitHub
          </Button>
        </section>
      </div>
    </section>
  );
};

export default About;

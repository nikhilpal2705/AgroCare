import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, CloudOutlined, SafetyCertificateOutlined, ThunderboltOutlined } from '@ant-design/icons';
import logo from '/images/agrocare-logo.svg';
import Footer from 'layout/main/Footer';

const highlights = [
  {
    title: 'Crop Monitoring',
    text: 'Manage crop records with core lifecycle data in one place.',
    points: ['Crop name, type, variety', 'Sowing and harvest dates'],
  },
  {
    title: 'Irrigation Scheduling',
    text: 'Schedule irrigation tasks linked to crops and monthly planning.',
    points: ['Crop-linked irrigation entries', 'Upcoming irrigation visibility'],
  },
  {
    title: 'Inventory & Pest Ops',
    text: 'Track stock and pest actions together for cleaner field operations.',
    points: ['Inventory quantity updates', 'Pest and pesticide logs'],
  },
];

const proofPoints = [
  { value: '24/7', label: 'Field visibility' },
  { value: '3 Core', label: 'Farm modules' },
  { value: '1 Dashboard', label: 'Single workflow' },
];

const benefits = [
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Secure Access',
    text: 'Role-based login keeps operational data protected for each user group.',
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'Fast Decisions',
    text: 'Clear cards and forms help your team move from insight to action quickly.',
  },
  {
    icon: <CloudOutlined />,
    title: 'Always Current',
    text: 'Keep farm operations aligned with live crop, irrigation, and inventory status.',
  },
];

const workflow = [
  {
    step: '01',
    title: 'Capture',
    text: 'Log field updates and stock changes quickly.',
  },
  {
    step: '02',
    title: 'Analyze',
    text: 'Review signals and plan next best actions.',
  },
  {
    step: '03',
    title: 'Act',
    text: 'Execute with focused tools built for farm teams.',
  },
];

const Home = () => {
  return (
    <section className="home-landing">
      <div className="home-shell">
        <header className="home-nav">
          <div className="home-brand">
            <span className="home-brand-mark">
              <img src={logo} alt="AgroCare" className="home-brand-logo" />
            </span>
            <span className="home-brand-text">
              <span className="home-brand-title">AgroCare</span>
              <span className="home-brand-subtitle">Smart Farm Console</span>
            </span>
          </div>

          <div className="home-nav-actions">
            <Link to="/login" className="home-chip home-chip-light">
              Login
            </Link>
            <Link to="/register" className="home-chip home-chip-primary">
              Get Started
            </Link>
          </div>
        </header>

        <div className="home-hero-grid">
          <article className="home-panel home-panel-primary">
            <span className="home-kicker">AGROCARE PLATFORM</span>
            <h1>Grow smarter with one command center for your farm.</h1>
            <p>
              Track crops, monitor irrigation, handle inventory, and respond to pest risks from one modern dashboard.
              AgroCare helps you make faster and better field decisions every day.
            </p>

            <div className="home-cta-row">
              <Link to="/register" className="home-cta home-cta-primary">
                Create Account
                <ArrowRightOutlined />
              </Link>
              <Link to="/login" className="home-cta home-cta-secondary">
                Sign In
              </Link>
            </div>

            <div className="home-proof-grid">
              {proofPoints.map((item) => (
                <div key={item.label} className="home-proof-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="home-panel home-panel-stack">
            {highlights.map((item) => (
              <div key={item.title} className="home-highlight-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul className="home-highlight-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="home-quote-card">
              <h3>Unified Farm Dashboard</h3>
              <p>See crop, irrigation, inventory, and pest activity in one workflow.</p>
              <ul className="home-quote-points">
                <li>Module-wise operational overview</li>
                <li>Faster day-to-day field decisions</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="home-benefits-grid">
          {benefits.map((item) => (
            <div key={item.title} className="home-benefit-card">
              <div className="home-benefit-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <section className="home-workflow-panel">
          <div className="home-workflow-header">
            <h2>How AgroCare fits your daily workflow.</h2>
            <p>From field update to action plan in one seamless flow.</p>
          </div>
          <div className="home-workflow-grid">
            {workflow.map((item) => (
              <div key={item.step} className="home-workflow-card">
                <span className="home-step-badge">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </section>
  );
};

export default Home;

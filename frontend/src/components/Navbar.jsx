import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <div style={styles.brandContainer}>
          <span style={styles.logo}>AquaGuard AI</span>
        </div>

        <div style={styles.linksContainer}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/water-map" style={styles.link}>
            Water Map
          </Link>
          <Link to="/ai-advisor" style={styles.link}>
            AI Advisor
          </Link>
          <Link to="/emergency-alerts" style={styles.link}>
            Emergency Alerts
          </Link>
          <Link to="/community-reports" style={styles.link}>
            Community Reports
          </Link>
        </div>

        <div style={styles.statusContainer}>
          <span style={styles.statusBadge}>Live Monitoring</span>
        </div>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'linear-gradient(90deg, #0b5d9d 0%, #1fb6ff 100%)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.12)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0.9rem 1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    color: '#ffffff',
    fontSize: '1.35rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
  },
  link: {
    color: '#eaf6ff',
    textDecoration: 'none',
    padding: '0.65rem 0.85rem',
    borderRadius: '999px',
    transition: 'background 0.2s ease, transform 0.2s ease',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  statusBadge: {
    background: 'rgba(255, 255, 255, 0.18)',
    color: '#ffffff',
    padding: '0.55rem 0.95rem',
    borderRadius: '999px',
    fontSize: '0.9rem',
    fontWeight: 600,
    border: '1px solid rgba(255, 255, 255, 0.25)',
  },
};

export default Navbar;

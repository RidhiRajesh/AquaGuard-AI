import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header style={styles.header}>
      <style>{`
        .navbar-link:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
          color: #ffffff;
        }
      `}</style>
      <nav style={styles.nav}>
        <div style={styles.brandContainer}>
          <span style={styles.logo}>AquaGuard AI</span>
        </div>

        <div style={styles.linksContainer}>
          <Link to="/" style={styles.link} className="navbar-link">
            Home
          </Link>
          <Link to="/water-map" style={styles.link} className="navbar-link">
            Water Map
          </Link>
          <Link to="/ai-advisor" style={styles.link} className="navbar-link">
            AI Advisor
          </Link>
          <Link to="/emergency-alerts" style={styles.link} className="navbar-link">
            Emergency Alerts
          </Link>
          <Link to="/community-reports" style={styles.link} className="navbar-link">
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
    backdropFilter: 'blur(18px)',
    background: 'rgba(11, 111, 167, 0.95)',
    boxShadow: '0 14px 40px rgba(4, 28, 63, 0.18)',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0.95rem 1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logo: {
    color: '#ffffff',
    fontSize: '1.35rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
  },
  linksContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.8rem',
    justifyContent: 'center',
  },
  link: {
    color: '#eaf6ff',
    textDecoration: 'none',
    padding: '0.72rem 0.95rem',
    borderRadius: '999px',
    transition: 'background 0.25s ease, transform 0.2s ease, color 0.2s ease',
  },
  linkHover: {
    background: 'rgba(255,255,255,0.12)',
    transform: 'translateY(-1px)',
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

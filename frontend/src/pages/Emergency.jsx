import React from 'react';

const alerts = [
  {
    type: 'Contamination Alert',
    severity: 'Critical',
    location: 'North River Intake',
    time: '5 mins ago',
    status: 'Active',
    critical: true,
  },
  {
    type: 'Flood Warning',
    severity: 'High',
    location: 'West Valley Reservoir',
    time: '12 mins ago',
    status: 'Monitoring',
    critical: true,
  },
  {
    type: 'Water Supply Disruption',
    severity: 'Moderate',
    location: 'Downtown Distribution',
    time: '30 mins ago',
    status: 'In Progress',
    critical: false,
  },
  {
    type: 'Boil Water Advisory',
    severity: 'Advisory',
    location: 'Eastside District',
    time: '1 hour ago',
    status: 'Recommended',
    critical: false,
  },
];

const contacts = [
  { name: 'Emergency Response Team', phone: '(800) 555-0199' },
  { name: 'Water Quality Hotline', phone: '(800) 555-0123' },
  { name: 'Local Health Department', phone: '(800) 555-0177' },
];

const instructions = [
  'Avoid using tap water for drinking until further notice.',
  'Use bottled or boiled water for cooking and hygiene.',
  'Follow official updates from AquaGuard AI and local authorities.',
  'Report unusual water color, odor, or taste immediately.',
];

const Emergency = () => {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Emergency Water Alerts</h1>
        <p style={styles.subtitle}>Stay informed with the latest emergency notifications and safety guidance.</p>
      </header>

      <section style={styles.cardGrid}>
        {alerts.map((alert) => (
          <div
            key={alert.type}
            style={{
              ...styles.card,
              borderColor: alert.critical ? '#d32f2f' : '#1e88e5',
              backgroundColor: alert.critical ? '#fff3f3' : '#f3f7ff',
            }}
          >
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>{alert.type}</h2>
              <span style={{
                ...styles.severity,
                backgroundColor: alert.critical ? '#d32f2f' : '#1e88e5',
              }}>
                {alert.severity}
              </span>
            </div>
            <div style={styles.cardBody}>
              <p style={styles.cardText}><strong>Location:</strong> {alert.location}</p>
              <p style={styles.cardText}><strong>Time:</strong> {alert.time}</p>
              <p style={styles.cardText}><strong>Status:</strong> {alert.status}</p>
            </div>
          </div>
        ))}
      </section>

      <section style={styles.infoSection}>
        <div style={styles.infoBlock}>
          <h3 style={styles.sectionTitle}>Emergency Contacts</h3>
          <ul style={styles.list}>
            {contacts.map((contact) => (
              <li key={contact.phone} style={styles.listItem}>
                <span>{contact.name}</span>
                <strong>{contact.phone}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.infoBlock}>
          <h3 style={styles.sectionTitle}>Safety Instructions</h3>
          <ol style={styles.list}>
            {instructions.map((item, index) => (
              <li key={index} style={styles.listItem}>{item}</li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    padding: '32px',
    background: '#f4f8ff',
    color: '#0d1b3d',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    maxWidth: '900px',
    margin: '0 auto 32px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '2.5rem',
    letterSpacing: '0.02em',
  },
  subtitle: {
    marginTop: '12px',
    fontSize: '1rem',
    color: '#4a6fa5',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  card: {
    border: '1px solid #c5d5f0',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 25px rgba(15, 52, 120, 0.08)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#0f2c5a',
  },
  severity: {
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '0.85rem',
  },
  cardBody: {
    lineHeight: 1.7,
  },
  cardText: {
    margin: '8px 0',
    color: '#12254d',
  },
  infoSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  infoBlock: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #d6e2f0',
  },
  sectionTitle: {
    margin: '0 0 16px',
    fontSize: '1.25rem',
    color: '#13306f',
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    color: '#1f3f7f',
  },
  listItem: {
    marginBottom: '12px',
    lineHeight: 1.6,
  },
};

export default Emergency;

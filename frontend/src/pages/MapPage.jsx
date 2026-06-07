import React from 'react';

const MapPage = () => {
  const summaryCards = [
    { label: 'Safe Water Sources', value: '128', color: '#00bcd4' },
    { label: 'Moderate Risk Areas', value: '42', color: '#0288d1' },
    { label: 'High Risk Alerts', value: '9', color: '#01579b' },
  ];

  const updates = [
    'Groundwater sampling completed in Chennai district.',
    'New treatment advisory issued for Coimbatore reservoirs.',
    'Mobile testing units deployed in Tuticorin coastal region.',
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.subTitle}>AquaGuard AI</p>
          <h1 style={styles.title}>Tamil Nadu Water Quality Monitor</h1>
        </div>
        <button style={styles.actionButton}>View Live Water Data</button>
      </header>

      <section style={styles.searchSection}>
        <div style={styles.searchBox}>
          <span style={styles.searchLabel}>Search district or city</span>
          <input
            type="text"
            placeholder="e.g. Chennai, Coimbatore"
            style={styles.searchInput}
          />
        </div>
      </section>

      <main style={styles.mainGrid}>
        <section style={styles.mapCard}>
          <div style={styles.mapHeader}>
            <h2 style={styles.cardTitle}>Water Quality Map</h2>
            <span style={styles.mapStatus}>Live overview</span>
          </div>
          <div style={styles.mapPlaceholder}>
            <p style={styles.mapPlaceholderText}>Map placeholder for Tamil Nadu water quality zones</p>
          </div>
        </section>

        <aside style={styles.sidebar}>
          <div style={styles.summaryPanel}>
            <h3 style={styles.panelTitle}>Water Quality Summary</h3>
            <div style={styles.cardGrid}>
              {summaryCards.map((card) => (
                <div key={card.label} style={{ ...styles.summaryCard, borderTop: `4px solid ${card.color}` }}>
                  <p style={styles.cardValue}>{card.value}</p>
                  <p style={styles.cardLabel}>{card.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.updatePanel}>
            <h3 style={styles.panelTitle}>Recent Updates</h3>
            <ul style={styles.updateList}>
              {updates.map((update, index) => (
                <li key={index} style={styles.updateItem}>{update}</li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#e8f7fb',
    color: '#03334d',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '24px',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  subTitle: {
    margin: 0,
    color: '#017b9d',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
  },
  title: {
    margin: '8px 0 0',
    fontSize: '2rem',
    lineHeight: 1.1,
  },
  actionButton: {
    background: 'linear-gradient(135deg, #00bcd4, #0288d1)',
    border: 'none',
    color: '#fff',
    padding: '14px 22px',
    borderRadius: '999px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(1, 54, 88, 0.18)',
    fontWeight: 600,
  },
  searchSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  searchBox: {
    width: '100%',
    maxWidth: '720px',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '18px 22px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchLabel: {
    flexShrink: 0,
    color: '#017b9d',
    fontWeight: 600,
  },
  searchInput: {
    flexGrow: 1,
    border: '1px solid #d8edf4',
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '1rem',
    color: '#03334d',
    outline: 'none',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.8fr 1fr',
    gap: '24px',
  },
  mapCard: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 16px 38px rgba(0, 0, 0, 0.08)',
    minHeight: '520px',
    display: 'flex',
    flexDirection: 'column',
  },
  mapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.2rem',
  },
  mapStatus: {
    background: '#e0f7ff',
    color: '#007ea7',
    borderRadius: '999px',
    padding: '8px 14px',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  mapPlaceholder: {
    flexGrow: 1,
    borderRadius: '20px',
    background: 'linear-gradient(180deg, #d7f5fb 0%, #f4fbff 100%)',
    border: '1px solid #d7eff6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
    textAlign: 'center',
  },
  mapPlaceholderText: {
    color: '#05627c',
    fontSize: '1rem',
    maxWidth: '420px',
    lineHeight: 1.6,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  summaryPanel: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 16px 38px rgba(0, 0, 0, 0.06)',
  },
  panelTitle: {
    margin: 0,
    marginBottom: '18px',
    fontSize: '1.05rem',
    color: '#023651',
  },
  cardGrid: {
    display: 'grid',
    gap: '16px',
  },
  summaryCard: {
    background: '#f2fbff',
    borderRadius: '18px',
    padding: '18px 20px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
  },
  cardValue: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 700,
  },
  cardLabel: {
    margin: '8px 0 0',
    color: '#055d78',
    fontSize: '0.95rem',
  },
  updatePanel: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 16px 38px rgba(0, 0, 0, 0.06)',
  },
  updateList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap: '12px',
  },
  updateItem: {
    background: '#f4fcff',
    borderRadius: '14px',
    padding: '14px 16px',
    color: '#034352',
    lineHeight: 1.5,
  },
};

export default MapPage;

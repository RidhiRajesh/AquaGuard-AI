import React, { useEffect, useState } from 'react';

 const createDynamicAlerts = (context) => {
  if (!context) return [];

  const district = context.district || "Unknown";
  const status = context.status || "Safe";

  const solids = Number(context.waterData?.Solids ?? 0);
  const conductivity = Number(context.waterData?.Conductivity ?? 0);

  const severity =
    status === "Unsafe"
      ? "Critical"
      : solids > 700 || conductivity > 850
      ? "High"
      : "Moderate";

  return [
    {
      type:
        status === "Unsafe"
          ? "Water Contamination Alert"
          : "Water Quality Monitoring",

      severity,

      location: district,

      time: "Just now",

      status,

      critical: status === "Unsafe",

      recommendedAction:
        status === "Unsafe"
          ? "Avoid drinking untreated water and use bottled water."
          : "Continue monitoring water quality.",

      safetyAdvice:
        status === "Unsafe"
          ? "Boil water before use and avoid direct consumption."
          : "Water quality is currently acceptable."
    }
  ];
};

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

const filters = ['All', 'Critical', 'High', 'Moderate', 'Advisory'];

const getAlertLevel = ({ status, ph, solids, conductivity }) => {
  const abnormalPh = ph < 6.5 || ph > 8.5;
  const highSolids = solids >= 900;
  const highConductivity = conductivity >= 1000;

  if (status === 'Unsafe' && (highSolids || highConductivity || abnormalPh)) {
    return 'High';
  }

  if (status === 'Unsafe' || abnormalPh || solids >= 700 || conductivity >= 850) {
    return 'Medium';
  }

  return 'Low';
};

const getAlertDetails = ({ district, status, waterData }) => {
  const ph = Number(waterData?.ph ?? 0);
  const solids = Number(waterData?.Solids ?? 0);
  const conductivity = Number(waterData?.Conductivity ?? 0);
  const alertLevel = getAlertLevel({ status, ph, solids, conductivity });

  if (alertLevel === 'High') {
    return {
      district,
      alertLevel,
      alertType: 'Water Quality Hazard',
      recommendedAction:
        'Avoid using tap water for drinking. Use bottled or properly treated water, and notify authorities immediately.',
      safetyAdvice:
        'High risk detected due to unsafe status and elevated contaminants. Do not consume without treatment.',
    };
  }

  if (alertLevel === 'Medium') {
    return {
      district,
      alertLevel,
      alertType: 'Water Quality Concern',
      recommendedAction:
        'Exercise caution with this water source. Boil water before use and monitor water quality frequently.',
      safetyAdvice:
        'Borderline water quality detected. Use treatment and avoid direct drinking until conditions improve.',
    };
  }

  return {
    district,
    alertLevel,
    alertType: 'Water Quality Normal',
    recommendedAction:
      'Water is currently safe for most household uses. Continue to monitor quality and stay informed.',
    safetyAdvice:
      'Low risk water quality. Use water normally but keep an eye on local updates.',
  };
};

 const Emergency = () => {
  const [filter, setFilter] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [waterContext, setWaterContext] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [dynamicAlerts, setDynamicAlerts] = useState([]);

  const filteredAlerts =
    filter === 'All'
      ? dynamicAlerts
      : dynamicAlerts.filter(
          (alert) => alert.severity === filter
        );

  const stats = {
    total: dynamicAlerts.length,
    critical: dynamicAlerts.filter(
      (alert) => alert.critical
    ).length,
    active: dynamicAlerts.filter(
      (alert) => alert.status === 'Unsafe'
    ).length,
    locations: new Set(
      dynamicAlerts.map((alert) => alert.location)
    ).size,
  };

  const handleFilterChange = (value) => {
    setFilter(value);

    const nextAlert =
      value === 'All'
        ? dynamicAlerts[0]
        : dynamicAlerts.find((alert) => alert.severity === value) || dynamicAlerts[0];

    setSelectedAlert(nextAlert || null);
  };

  useEffect(() => {
    const updateFromStorage = () => {
      const saved = localStorage.getItem('waterContext');

      if (!saved) {
        setWaterContext(null);
        setAssessment(null);
        setDynamicAlerts([]);
        setSelectedAlert(null);
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        setWaterContext(parsed);

        const details = getAlertDetails(parsed);
        setAssessment(details);

        const generatedAlerts = createDynamicAlerts(parsed);
        setDynamicAlerts(generatedAlerts);
        setSelectedAlert(generatedAlerts[0] || null);
      } catch (error) {
        console.error(error);
        setWaterContext(null);
        setAssessment(null);
        setDynamicAlerts([]);
        setSelectedAlert(null);
      }
    };

    updateFromStorage();

    const handleStorage = (event) => {
      if (event.key === 'waterContext') {
        updateFromStorage();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Emergency Water Alerts</h1>
        <p style={styles.subtitle}>Stay informed with the latest emergency notifications and safety guidance.</p>
      </header>

      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Alerts</p>
            <p style={styles.statValue}>{stats.total}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Critical Alerts</p>
            <p style={styles.statValue}>{stats.critical}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Active Alerts</p>
            <p style={styles.statValue}>{stats.active}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Locations Affected</p>
            <p style={styles.statValue}>{stats.locations}</p>
          </div>
        </div>
        <div style={styles.filterBar}>
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleFilterChange(item)}
              style={{
                ...styles.filterButton,
                ...(filter === item ? styles.filterButtonActive : {}),
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section style={styles.cardGrid}>
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.type}
              onClick={() => setSelectedAlert(alert)}
              style={{
                ...styles.card,
                borderColor: alert.critical ? '#d32f2f' : '#1e88e5',
                backgroundColor: alert.critical ? '#fff3f3' : '#f3f7ff',
                ...(selectedAlert?.type === alert.type ? styles.selectedCard : {}),
              }}
            >
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>{alert.type}</h2>
                <span
                  style={{
                    ...styles.severity,
                    backgroundColor: alert.critical ? '#d32f2f' : '#1e88e5',
                  }}
                >
                  {alert.severity}
                </span>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardText}>
                  <strong>Location:</strong> {alert.location}
                </p>
                <p style={styles.cardText}>
                  <strong>Time:</strong> {alert.time}
                </p>
                <p style={styles.cardText}>
                  <strong>Status:</strong> {alert.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noDataCard}>
            <p style={styles.noDataText}>
              No emergency data available. Please select a district from the map.
            </p>
          </div>
        )}
      </section>

      <section style={styles.assessmentSection}>
        <div style={styles.assessmentCard}>
          <h3 style={styles.sectionTitle}>AI Emergency Assessment</h3>
          {assessment ? (
            <>
              <p style={styles.assessmentText}>
                <strong>District:</strong> {assessment.district || 'Unknown'}
              </p>
              <p style={styles.assessmentText}>
                <strong>Alert Level:</strong> {assessment.alertLevel || 'Unknown'}
              </p>
              <p style={styles.assessmentText}>
                <strong>Alert Type:</strong> {assessment.alertType || 'N/A'}
              </p>
              <p style={styles.assessmentText}>
                <strong>Recommended Action:</strong> {assessment.recommendedAction || 'N/A'}
              </p>
              <p style={styles.assessmentText}>
                <strong>Safety Advice:</strong> {assessment.safetyAdvice || 'N/A'}
              </p>
            </>
          ) : (
            <p style={styles.assessmentText}>
              No emergency data available. Please select a district from the map.
            </p>
          )}
        </div>
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
    padding: '32px 24px 48px',
    background: '#eef8ff',
    color: '#0d1b3d',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    maxWidth: 1320,
    margin: '0 auto 34px',
    textAlign: 'center',
    padding: '0 12px',
  },
  title: {
    margin: 0,
    fontSize: '2.6rem',
    letterSpacing: '0.01em',
    color: '#042e5f',
  },
  subtitle: {
    marginTop: '14px',
    fontSize: '1.05rem',
    color: '#3f5d85',
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  statsSection: {
    maxWidth: 1320,
    margin: '0 auto 32px',
    padding: '0 12px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    gap: '18px',
    marginBottom: '20px',
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid rgba(12, 55, 101, 0.08)',
    borderRadius: '22px',
    padding: '24px',
    boxShadow: '0 16px 40px rgba(15, 52, 120, 0.08)',
  },
  statLabel: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#5f7d9b',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  statValue: {
    margin: '12px 0 0',
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0b3f72',
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  filterButton: {
    border: '1px solid #c6dbf2',
    borderRadius: '999px',
    background: '#ffffff',
    color: '#11426b',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  filterButtonActive: {
    background: '#0f75c4',
    color: '#ffffff',
    borderColor: '#0f75c4',
    boxShadow: '0 12px 28px rgba(15, 52, 120, 0.12)',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  card: {
    border: '1px solid rgba(12, 55, 101, 0.12)',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 16px 36px rgba(15, 51, 85, 0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    background: '#ffffff',
  },
  selectedCard: {
    boxShadow: '0 20px 40px rgba(15, 52, 120, 0.16)',
    transform: 'translateY(-2px)',
    borderColor: '#0f73c0',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '12px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.15rem',
    color: '#0d3d66',
  },
  severity: {
    color: '#fff',
    padding: '7px 14px',
    borderRadius: '999px',
    fontSize: '0.85rem',
    minWidth: 82,
    textAlign: 'center',
  },
  cardBody: {
    lineHeight: 1.8,
  },
  cardText: {
    margin: '10px 0',
    color: '#132f55',
  },
  assessmentSection: {
    marginBottom: '32px',
    padding: '0 12px',
  },
  assessmentCard: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '28px',
    border: '1px solid rgba(12, 55, 101, 0.12)',
    boxShadow: '0 18px 44px rgba(15, 52, 120, 0.10)',
    maxWidth: 980,
    margin: '0 auto 32px',
  },
  assessmentText: {
    margin: '12px 0',
    color: '#1b3a5d',
    lineHeight: 1.75,
  },
  noDataCard: {
    gridColumn: '1 / -1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '180px',
    borderRadius: '20px',
    background: '#ffffff',
    border: '1px solid rgba(12, 55, 101, 0.12)',
    padding: '24px',
    boxShadow: '0 14px 38px rgba(15, 52, 120, 0.08)',
  },
  noDataText: {
    margin: 0,
    color: '#3f5f85',
    fontSize: '1.06rem',
    textAlign: 'center',
  },
  infoSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  infoBlock: {
    background: '#ffffff',
    borderRadius: '22px',
    padding: '24px',
    border: '1px solid rgba(12, 55, 101, 0.1)',
    boxShadow: '0 12px 30px rgba(15, 52, 120, 0.06)',
  },
  sectionTitle: {
    margin: '0 0 16px',
    fontSize: '1.3rem',
    color: '#0e3a65',
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
    color: '#1f3f7f',
  },
  listItem: {
    marginBottom: '12px',
    lineHeight: 1.8,
    color: '#2c4d70',
  },
};

export default Emergency;


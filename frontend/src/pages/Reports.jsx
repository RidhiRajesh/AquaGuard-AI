import React, { useState,useEffect } from 'react';

const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'];
const issueTypes = ['Water Odor', 'Discoloration', 'Low Supply', 'Contamination', 'Leakage', 'Other'];

const initialReports = [
  {
    id: 1,
    name: 'Sundar',
    district: 'Chennai',
    issueType: 'Leakage',
    description: 'Water is leaking from the main pipeline near my apartment.',
    status: 'Pending',
    priority: 'Critical',
    submitted: 'Today',
  },
  {
    id: 2,
    name: 'Kala',
    district: 'Madurai',
    issueType: 'Discoloration',
    description: 'Tap water is brown and cloudy for the last two days.',
    status: 'Resolved',
    priority: 'Normal',
    submitted: 'Yesterday',
  },
];

const Reports = () => {
  const [formData, setFormData] = useState({
    name: '',
    district: districts[0],
    issueType: issueTypes[0],
    description: '',
  });
  const [reports, setReports] = useState(initialReports);
  useEffect(() => {
  const savedReports = localStorage.getItem("communityReports");

  if (savedReports) {
    try {
      setReports(JSON.parse(savedReports));
    } catch (err) {
      console.log(err);
    }
  }
}, []);

  const totalReports = reports.length;
  const pendingReports = reports.filter((report) => report.status === 'Pending').length;
  const criticalReports = reports.filter((report) => report.priority === 'Critical').length;
  const resolvedReports = reports.filter((report) => report.status === 'Resolved').length;

  const getPriority = (issueType) => {
    return ['Contamination', 'Leakage', 'Water Odor'].includes(issueType) ? 'Critical' : 'Normal';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      return;
    }

    const newReport = {
      id: Date.now(),
      name: formData.name.trim(),
      district: formData.district,
      issueType: formData.issueType,
      description: formData.description.trim(),
      status: 'Pending',
      priority: getPriority(formData.issueType),
      submitted: 'Just now',
    };

    const updatedReports = [newReport, ...reports];

setReports(updatedReports);

localStorage.setItem(
  "communityReports",
  JSON.stringify(updatedReports)
);
    setFormData({
      name: '',
      district: districts[0],
      issueType: issueTypes[0],
      description: '',
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '36px 20px 48px',
        background: 'linear-gradient(180deg, #eef7ff 0%, #f8fbff 100%)',
        color: '#102a43',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1380, margin: '0 auto' }}>
        <header style={{ marginBottom: 32, padding: '0 12px' }}>
          <p style={{ marginBottom: 10, color: '#2563eb', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 13 }}>
            Citizen Reporting
          </p>
          <h1 style={{ fontSize: '2.9rem', fontWeight: 800, margin: 0, lineHeight: 1.05 }}>AquaGuard AI Community Reports</h1>
          <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.8, maxWidth: 780, color: '#3f566f' }}>
            Track local water issues, submit new reports, and see how the community is helping AquaGuard resolve problems across Tamil Nadu.
          </p>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 18,
            marginBottom: 32,
          }}
        >
          {[
            { label: 'Total Reports', value: totalReports, accent: '#3182ce' },
            { label: 'Pending Reports', value: pendingReports, accent: '#dd6b20' },
            { label: 'Critical Reports', value: criticalReports, accent: '#e53e3e' },
            { label: 'Resolved Reports', value: resolvedReports, accent: '#2f855a' },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                padding: 24,
                borderRadius: 24,
                background: '#ffffff',
                boxShadow: '0 20px 40px rgba(14, 82, 160, 0.08)',
                borderTop: `4px solid ${card.accent}`,
              }}
            >
              <p style={{ margin: 0, fontSize: 14, color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                {card.label}
              </p>
              <p style={{ margin: '16px 0 0', fontSize: 32, fontWeight: 700, color: '#0b2545' }}>{card.value}</p>
            </div>
          ))}
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)',
            gap: 24,
            alignItems: 'start',
          }}
        >
          <div
            style={{
              padding: 32,
              borderRadius: 32,
              background: '#ffffff',
              boxShadow: '0 28px 64px rgba(16, 42, 67, 0.08)',
              border: '1px solid rgba(13, 64, 108, 0.08)',
            }}
          >
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#102a43' }}>Submit a New Report</h2>
            <p style={{ marginTop: 12, color: '#4a5568', lineHeight: 1.7 }}>Help AquaGuard AI stay updated on local water quality and infrastructure issues.</p>
            <form onSubmit={handleSubmit} style={{ marginTop: 26, display: 'grid', gap: 18 }}>
              <label style={{ display: 'grid', gap: 6, fontSize: 14, color: '#2d3748' }}>
                Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: '1px solid #cbd5e0',
                    background: '#f7fafc',
                    color: '#102a43',
                    fontSize: 15,
                  }}
                />
              </label>

              <label style={{ display: 'grid', gap: 6, fontSize: 14, color: '#2d3748' }}>
                District
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: '1px solid #cbd5e0',
                    background: '#f7fafc',
                    color: '#102a43',
                    fontSize: 15,
                  }}
                >
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'grid', gap: 6, fontSize: 14, color: '#2d3748' }}>
                Issue Type
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: '1px solid #cbd5e0',
                    background: '#f7fafc',
                    color: '#102a43',
                    fontSize: 15,
                  }}
                >
                  {issueTypes.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'grid', gap: 6, fontSize: 14, color: '#2d3748' }}>
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the issue in detail"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: '1px solid #cbd5e0',
                    background: '#f7fafc',
                    color: '#102a43',
                    fontSize: 15,
                    resize: 'vertical',
                  }}
                />
              </label>

              <button
                type="submit"
                style={{
                  marginTop: 4,
                  padding: '14px 20px',
                  borderRadius: 14,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(90deg, #2b6cb0, #3182ce)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Submit Report
              </button>
            </form>
          </div>

          <div
            style={{
              padding: 28,
              borderRadius: 28,
              background: 'rgba(255,255,255,0.96)',
              boxShadow: '0 30px 60px rgba(16, 42, 67, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#102a43' }}>Recent Reports</h2>
                <p style={{ margin: '8px 0 0', color: '#4a5568' }}>Latest community submissions are displayed here in real time.</p>
              </div>
              <div style={{ padding: '8px 14px', borderRadius: 999, background: '#e8f3ff', color: '#2b6cb0', fontWeight: 700, fontSize: 13 }}>
                {totalReports} entries
              </div>
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {reports.map((report) => (
                <div
                  key={report.id}
                  style={{
                    padding: 20,
                    borderRadius: 22,
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ margin: 0, color: '#4a5568', fontSize: 14 }}>{report.district}</p>
                      <h3 style={{ margin: '6px 0 0', fontSize: 18, fontWeight: 700, color: '#102a43' }}>{report.issueType}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          padding: '6px 10px',
                          borderRadius: 999,
                          background: report.priority === 'Critical' ? '#fee2e2' : '#edf2f7',
                          color: report.priority === 'Critical' ? '#c53030' : '#4a5568',
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {report.priority}
                      </span>
                      <span
                        style={{
                          padding: '6px 10px',
                          borderRadius: 999,
                          background: report.status === 'Resolved' ? '#e6fffa' : '#ebf8ff',
                          color: report.status === 'Resolved' ? '#2c7a7b' : '#2b6cb0',
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: '18px 0 0', color: '#4a5568', lineHeight: 1.7 }}>{report.description}</p>
                  <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 13, color: '#718096' }}>
                    <span>Reported by {report.name}</span>
                    <span>{report.submitted}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Reports;


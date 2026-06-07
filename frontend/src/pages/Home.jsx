import React from 'react';

const featureCards = [
  {
    title: 'Water Quality Map',
    description: 'Visualize local water sources with safety scores, contamination alerts, and live updates.',
  },
  {
    title: 'AI Water Advisor',
    description: 'Get instant recommendations on water usage, treatment, and health risks for your neighborhood.',
  },
  {
    title: 'Voice Assistant',
    description: 'Ask questions and receive spoken guidance about water quality and safety in real time.',
  },
  {
    title: 'Emergency Alerts',
    description: 'Receive fast alerts for contamination events, boil advisories, and flood warnings.',
  },
  {
    title: 'Community Reports',
    description: 'Share observations and access verified citizen reports from nearby districts.',
  },
  {
    title: 'Risk Prediction',
    description: 'Explore AI-driven forecasts for water risks and emerging safety concerns.',
  },
];

const stats = [
  { value: '20+', label: 'Water Sources' },
  { value: '10+', label: 'Districts Covered' },
  { value: '24/7', label: 'AI Guidance' },
];

const Home = () => {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f5fbff', color: '#0d3b66', minHeight: '100vh' }}>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, alignItems: 'center', padding: '40px 0' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#d7f4ff', color: '#05668d', padding: '8px 16px', borderRadius: 999, fontSize: 14, marginBottom: 20 }}>
              AI-Powered Water Intelligence
            </div>
            <h1 style={{ fontSize: '3rem', lineHeight: 1.05, margin: 0 }}>AquaGuard AI</h1>
            <p style={{ fontSize: '1.15rem', color: '#16425b', marginTop: 16, maxWidth: 640 }}>
              AI-Powered Water Quality Intelligence Platform for citizens, communities, and local responders. Understand local water quality, identify safety risks, and receive emergency alerts in one place.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 28 }}>
              <button style={{ background: '#05668d', color: '#ffffff', border: 'none', borderRadius: 999, padding: '14px 24px', cursor: 'pointer', fontWeight: 600 }}>
                Explore Water Map
              </button>
              <button style={{ background: 'rgba(5, 102, 141, 0.12)', color: '#05668d', border: 'none', borderRadius: 999, padding: '14px 24px', cursor: 'pointer', fontWeight: 600 }}>
                Ask AI Advisor
              </button>
            </div>
          </div>
          <div style={{ background: '#eff8ff', borderRadius: 24, padding: 28, boxShadow: '0 24px 60px rgba(3, 34, 57, 0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
              {featureCards.slice(0, 4).map((card) => (
                <div key={card.title} style={{ background: '#ffffff', borderRadius: 20, padding: 20, minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(3, 34, 57, 0.05)' }}>
                  <strong style={{ fontSize: 16 }}>{card.title}</strong>
                  <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: '#4a6b7d' }}>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '40px 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 24 }}>Key Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {featureCards.map((feature) => (
              <div key={feature.title} style={{ background: '#ffffff', borderRadius: 24, padding: 24, boxShadow: '0 18px 40px rgba(3, 34, 57, 0.06)', minHeight: 180 }}>
                <h3 style={{ margin: 0, fontSize: 18, color: '#0d3b66' }}>{feature.title}</h3>
                <p style={{ marginTop: 12, color: '#4a6b7d', lineHeight: 1.7 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '40px 0', background: 'linear-gradient(180deg, #e7f8ff 0%, #ffffff 100%)', borderRadius: 32, marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 560 }}>
              <span style={{ display: 'inline-block', marginBottom: 12, color: '#05668d', fontWeight: 700 }}>Trusted coverage</span>
              <h2 style={{ fontSize: '2rem', margin: '0 0 16px' }}>Water safety intelligence for every district.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#16425b' }}>
                AquaGuard AI brings water quality monitoring, alerts, and community insights together in a clean, responsive dashboard designed for citizens and emergency teams.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, flex: '1 1 320px' }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ background: '#ffffff', borderRadius: 20, padding: 24, textAlign: 'center', boxShadow: '0 16px 30px rgba(3, 34, 57, 0.06)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#05668d' }}>{stat.value}</div>
                  <div style={{ marginTop: 8, color: '#4a6b7d', fontSize: 14 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

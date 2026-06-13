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
      <main style={{ maxWidth: 1380, margin: '0 auto', padding: '48px 24px' }}>
        <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.95fr', gap: 36, alignItems: 'center', padding: '32px 0 40px' }}>
          <style>{`
            .hero-wave {
              position: absolute;
              border-radius: 50%;
              opacity: 0.58;
              animation: float 8s ease-in-out infinite;
            }

            .hero-wave--large {
              width: 220px;
              height: 220px;
              background: radial-gradient(circle at 30% 30%, rgba(0, 137, 204, 0.22), transparent 62%);
              top: -60px;
              right: -40px;
            }

            .hero-wave--medium {
              width: 140px;
              height: 140px;
              background: radial-gradient(circle at 50% 40%, rgba(2, 117, 176, 0.28), transparent 68%);
              bottom: 24px;
              right: 40px;
              animation-duration: 10s;
            }

            .hero-bubble {
              position: absolute;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.78);
              box-shadow: 0 0 18px rgba(255, 255, 255, 0.4);
              animation: float 6s ease-in-out infinite;
            }

            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>

          <div>
            <div style={{ display: 'inline-block', background: '#d8f3ff', color: '#05668d', padding: '10px 18px', borderRadius: 999, fontSize: 14, marginBottom: 22, fontWeight: 700, letterSpacing: '0.04em' }}>
              AI-Powered Water Intelligence
            </div>
            <h1 style={{ fontSize: '3.4rem', lineHeight: 1.02, margin: 0, maxWidth: 680 }}>AquaGuard AI — the next generation water safety dashboard.</h1>
            <p style={{ fontSize: '1.13rem', color: '#16425b', marginTop: 20, maxWidth: 680, lineHeight: 1.75 }}>
              Streamline water quality monitoring, risk prediction, and emergency alerts with an AI-first platform built for local communities and first responders.
            </p>
          </div>
          <div style={{ position: 'relative', minHeight: 440, borderRadius: 32, overflow: 'hidden', background: 'linear-gradient(180deg, #eaf7ff 0%, #f8fdff 100%)', border: '1px solid rgba(2, 110, 172, 0.12)', boxShadow: '0 28px 72px rgba(3, 34, 57, 0.08)', padding: 28 }}>
            <div className="hero-wave hero-wave--large" />
            <div className="hero-wave hero-wave--medium" />
            <div className="hero-bubble" style={{ top: 60, left: 36 }} />
            <div className="hero-bubble" style={{ top: 180, right: 80, animationDelay: '1.1s' }} />
            <div className="hero-bubble" style={{ bottom: 72, left: 72, animationDelay: '0.5s' }} />

            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '24px' }}>
              <div style={{ width: 88, height: 88, marginBottom: 22, borderRadius: 24, background: 'linear-gradient(135deg, #0288d1, #00b4db)', display: 'grid', placeItems: 'center', boxShadow: '0 20px 40px rgba(0, 124, 183, 0.25)' }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 5V11C4 16.55 7.71 21.49 12 22C16.29 21.49 20 16.55 20 11V5L12 2Z" fill="white" opacity="0.96"/>
                  <path d="M9.5 11.5L11.5 13.5L14.5 10.5" stroke="#d2f1ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ color: '#0b3d67', fontSize: '1.5rem', margin: 0, maxWidth: 360 }}>AI shield for safe water decisions</h3>
              <p style={{ marginTop: 14, color: '#4a6b7d', lineHeight: 1.75, maxWidth: 420 }}>
                A clean modern illustration of AquaGuard’s predictive water monitoring and intelligent risk detection.
              </p>
              <div style={{ display: 'grid', gap: 12, marginTop: 26, width: '100%', maxWidth: 420, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0288d1', marginTop: 8 }} />
                  <span style={{ color: '#183a5b', lineHeight: 1.6 }}>Live water risk insights across districts.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0b6fa4', marginTop: 8 }} />
                  <span style={{ color: '#183a5b', lineHeight: 1.6 }}>Trusted AI alerts for contamination and local safety.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00b4db', marginTop: 8 }} />
                  <span style={{ color: '#183a5b', lineHeight: 1.6 }}>Beautiful presentation for executive monitoring.</span>
                </div>
              </div>
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

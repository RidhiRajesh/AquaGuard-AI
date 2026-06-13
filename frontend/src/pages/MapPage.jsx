import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import tamilnaduDistricts from '../data/tamilnaduDistricts';
import districtWaterData from '../data/districtWaterData';
import { getWeather } from '../services/weatherApi';
import { getWaterPrediction } from '../services/waterApi';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapPage = () => {
  const summaryCards = [
    { label: 'Safe Water Sources', value: '128', color: '#00bcd4' },
    { label: 'Moderate Risk Areas', value: '42', color: '#0288d1' },
    { label: 'High Risk Alerts', value: '9', color: '#01579b' },
  ];
  const markers = tamilnaduDistricts.map((district) => {
    const waterData = districtWaterData[district.district] || {};
    return {
      name: district.district,
      position: [district.latitude, district.longitude],
      status: 'Data Pending',
      riskLevel: 'Unknown',
      recommendation: 'Water data and prediction will appear here.',
      ...waterData,
    };
  });
 
  const mapCenter = [11.1271, 78.6569];

  const [selectedLocation, setSelectedLocation] = useState(markers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [weather, setWeather] = useState({
    temperature: null,
    humidity: null,
    rainfall: null,
  });
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionError, setPredictionError] = useState(null);

  const matchedDistricts = searchTerm.trim()
    ? markers.filter((marker) => marker.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowDropdown(value.trim().length > 0);
  };

  const handleSelectDistrict = (district) => {
    setSelectedLocation(district);
    setSearchTerm(district.name);
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!selectedLocation?.position) {
        return;
      }

      const [latitude, longitude] = selectedLocation.position;
      setWeatherLoading(true);
      setWeatherError(null);

      try {
        const data = await getWeather(latitude, longitude);
        setWeather({
          temperature: data.temperature ?? 'N/A',
          humidity: data.humidity ?? 'N/A',
          rainfall: data.rainfall ?? 'N/A',
        });
      } catch (error) {
        setWeatherError('Unable to fetch weather data.');
        setWeather({
          temperature: null,
          humidity: null,
          rainfall: null,
        });
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [selectedLocation]);

  useEffect(() => {
    setPrediction(null);
    setPredictionError(null);
  }, [selectedLocation]);

  const handleRunPrediction = async () => {
    setPredictionLoading(true);
    setPredictionError(null);
    setPrediction(null);

    const predictionPayload = {
      ph: selectedLocation.ph,
      Hardness: selectedLocation.Hardness,
      Solids: selectedLocation.Solids,
      Chloramines: selectedLocation.Chloramines,
      Sulfate: selectedLocation.Sulfate,
      Conductivity: selectedLocation.Conductivity,
      Organic_carbon: selectedLocation.Organic_carbon,
      Trihalomethanes: selectedLocation.Trihalomethanes,
      Turbidity: selectedLocation.Turbidity,
    };

    try {
      const result = await getWaterPrediction(predictionPayload);
      setPrediction(result);
      localStorage.setItem(
        'waterContext',
        JSON.stringify({
          district: selectedLocation.name,
          waterData: predictionPayload,
          prediction: result.prediction,
          status: result.status,
        })
      );
    } catch (error) {
      setPredictionError(error.message || 'Prediction request failed');
    } finally {
      setPredictionLoading(false);
    }
  };

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
          <div style={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="e.g. Chennai, Coimbatore"
              value={searchTerm}
              onChange={handleSearchChange}
              style={styles.searchInput}
            />
            {showDropdown && matchedDistricts.length > 0 && (
              <div style={styles.searchDropdown}>
                {matchedDistricts.map((district) => (
                  <button
                    key={district.name}
                    type="button"
                    onClick={() => handleSelectDistrict(district)}
                    style={styles.searchOption}
                  >
                    {district.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <main style={styles.mainGrid}>
        <section style={styles.mapCard}>
          <div style={styles.mapHeader}>
            <h2 style={styles.cardTitle}>Water Quality Map</h2>
            <span style={styles.mapStatus}>Live overview</span>
          </div>
          <div style={styles.mapPlaceholder}>
            <MapContainer center={mapCenter} zoom={7.2} scrollWheelZoom={false} style={styles.mapContainer}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers.map((marker) => (
                <Marker
                  key={marker.name}
                  position={marker.position}
                  icon={markerIcon}
                  eventHandlers={{ click: () => setSelectedLocation(marker) }}
                >
                  <Popup>
                    <strong>{marker.name}</strong>
                    <div style={styles.popupText}>Water Quality Status: {marker.status}</div>
                    <div style={styles.popupText}>pH Value: {marker.ph}</div>
                    <div style={styles.popupText}>Solids: {marker.Solids}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
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
            <h3 style={styles.panelTitle}>District Water Analysis</h3>
            <div style={styles.analysisGrid}>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>District Name</span>
                <span style={styles.analysisValue}>{selectedLocation.name}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Water Quality Status</span>
                <span style={styles.analysisValue}>{prediction?.status ?? selectedLocation.status}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>pH Value</span>
                <span style={styles.analysisValue}>{selectedLocation.ph}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Hardness</span>
                <span style={styles.analysisValue}>{selectedLocation.Hardness}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Solids</span>
                <span style={styles.analysisValue}>{selectedLocation.Solids}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Chloramines</span>
                <span style={styles.analysisValue}>{selectedLocation.Chloramines}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Sulfate</span>
                <span style={styles.analysisValue}>{selectedLocation.Sulfate}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Conductivity</span>
                <span style={styles.analysisValue}>{selectedLocation.Conductivity}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Organic Carbon</span>
                <span style={styles.analysisValue}>{selectedLocation.Organic_carbon}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Trihalomethanes</span>
                <span style={styles.analysisValue}>{selectedLocation.Trihalomethanes}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Turbidity</span>
                <span style={styles.analysisValue}>{selectedLocation.Turbidity}</span>
              </div>
              <div style={styles.analysisRow}>
                <span style={styles.analysisLabel}>Risk Level</span>
                <span style={styles.analysisValue}>{selectedLocation.riskLevel}</span>
              </div>
              <div style={styles.analysisRecommendation}>
                <span style={styles.analysisLabel}>AI Recommendation</span>
                <p style={styles.analysisValue}>{selectedLocation.recommendation}</p>
              </div>
              <button
                style={styles.predictButton}
                onClick={handleRunPrediction}
                disabled={predictionLoading}
                type="button"
              >
                {predictionLoading ? 'Analyzing water...' : 'Run Water Prediction'}
              </button>
              {predictionError && (
                <div style={styles.predictionError}>{predictionError}</div>
              )}
              {prediction && (
                <>
                  <div style={styles.analysisRow}>
                    <span style={styles.analysisLabel}>Prediction</span>
                    <span style={styles.analysisValue}>{prediction.prediction}</span>
                  </div>
                  <div style={styles.analysisRow}>
                    <span style={styles.analysisLabel}>Safety Status</span>
                    <span style={styles.analysisValue}>{prediction.status}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={styles.updatePanel}>
            <h3 style={styles.panelTitle}>Weather Information</h3>
            <div style={styles.analysisGrid}>
              {weatherLoading ? (
                <div style={styles.weatherStatus}>Loading weather data...</div>
              ) : weatherError ? (
                <div style={styles.weatherStatus}>{weatherError}</div>
              ) : (
                <> 
                  <div style={styles.analysisRow}>
                    <span style={styles.analysisLabel}>Temperature</span>
                    <span style={styles.analysisValue}>
                      {weather.temperature !== null ? `${weather.temperature} °C` : 'N/A'}
                    </span>
                  </div>
                  <div style={styles.analysisRow}>
                    <span style={styles.analysisLabel}>Humidity</span>
                    <span style={styles.analysisValue}>
                      {weather.humidity !== null ? `${weather.humidity} %` : 'N/A'}
                    </span>
                  </div>
                  <div style={styles.analysisRow}>
                    <span style={styles.analysisLabel}>Rainfall</span>
                    <span style={styles.analysisValue}>
                      {weather.rainfall !== null ? `${weather.rainfall} mm` : 'N/A'}
                    </span>
                  </div>
                </>
              )}
            </div>
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
    padding: '28px 20px 36px',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '28px',
    maxWidth: 1380,
    marginLeft: 'auto',
    marginRight: 'auto',
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
    maxWidth: '760px',
    background: '#ffffff',
    borderRadius: '20px',
    padding: '18px 22px',
    boxShadow: '0 16px 35px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
  },
  searchLabel: {
    flexShrink: 0,
    color: '#017b9d',
    fontWeight: 600,
  },
  searchInputWrapper: {
    flexGrow: 1,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    border: '1px solid #d8edf4',
    borderRadius: '12px',
    padding: '14px 16px',
    fontSize: '1rem',
    color: '#03334d',
    outline: 'none',
  },
  searchDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 10,
    background: '#ffffff',
    border: '1px solid #d8edf4',
    borderRadius: 14,
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
    zIndex: 10,
    maxHeight: 220,
    overflowY: 'auto',
  },
  searchOption: {
    width: '100%',
    textAlign: 'left',
    padding: '12px 16px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#03334d',
    fontSize: '1rem',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.7fr minmax(320px, 1fr)',
    gap: '24px',
    maxWidth: 1380,
    margin: '0 auto',
  },
  mapCard: {
    background: '#ffffff',
    borderRadius: '28px',
    padding: '26px',
    boxShadow: '0 22px 48px rgba(3, 34, 57, 0.10)',
    minHeight: '540px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(3, 34, 57, 0.08)',
    overflow: 'hidden',
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
    minHeight: '480px',
    borderRadius: '24px',
    background: 'linear-gradient(180deg, #d7f5fb 0%, #f4fbff 100%)',
    border: '1px solid #d7eff6',
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'stretch',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    padding: 0,
  },
  mapPlaceholderText: {
    color: '#05627c',
    fontSize: '1rem',
    maxWidth: '420px',
    lineHeight: 1.6,
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    minHeight: '480px',
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
  analysisGrid: {
    display: 'grid',
    gap: '14px',
  },
  analysisRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    background: '#f4fcff',
    borderRadius: '16px',
    color: '#03334d',
  },
  weatherStatus: {
    padding: '14px 16px',
    background: '#f4fcff',
    borderRadius: '16px',
    color: '#045269',
  },
  analysisLabel: {
    fontSize: '0.95rem',
    color: '#045269',
    fontWeight: 600,
  },
  analysisValue: {
    fontSize: '0.95rem',
    color: '#023651',
    textAlign: 'right',
    lineHeight: 1.5,
  },
  predictButton: {
    marginTop: '18px',
    width: '100%',
    border: 'none',
    borderRadius: '999px',
    padding: '14px 18px',
    background: '#017b9d',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '0.95rem',
  },
  predictionError: {
    marginTop: '14px',
    padding: '12px 14px',
    background: '#ffe8e8',
    borderRadius: '16px',
    color: '#8b1a1a',
    fontSize: '0.95rem',
  },
  analysisRecommendation: {
    padding: '16px',
    background: '#eaf8ff',
    borderRadius: '18px',
    color: '#03334d',
    lineHeight: 1.6,
  },
};

export default MapPage;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import Advisor from './pages/Advisor';
import Emergency from './pages/Emergency';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/water-map" element={<MapPage />} />
        <Route path="/ai-advisor" element={<Advisor />} />
        <Route path="/emergency-alerts" element={<Emergency />} />
        <Route path="/community-reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

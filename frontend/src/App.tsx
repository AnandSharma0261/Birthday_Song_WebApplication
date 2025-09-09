import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import OTPPage from './components/OTPPage';
import PersonalDetailsPage from './components/PersonalDetailsPage';
import PreferencesPage from './components/PreferencesPage';
import LyricsPage from './components/LyricsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/personal-details" element={<PersonalDetailsPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/lyrics" element={<LyricsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

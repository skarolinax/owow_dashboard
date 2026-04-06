import { useState, useEffect } from 'react'
import './styles/App.css'; 
import  Navbar from './components/Navbar.jsx';
// import { useTheme } from './hooks/useTheme';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import all pages 
import BudgetPage from './pages/BudgetPage';
import ClientsOverview from './pages/ClientsOverview';
import CProjectsOverview from './pages/CProjectsOverview';
import GridDashboard from './pages/GridDashboard';
import ClientGridDashboard from './pages/ClientGridDashboard';
import LoginPage from './pages/LoginPage';
import StatusPage from './pages/StatusPage';
import RoadmapPage from './pages/Roadmap';
import RisksPage from './pages/RisksPage';
import UpdatesPage from './pages/UpdatesPage';

function AppContent() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Hide Navbar on these pages
  const hideNavbarOn = ['/', '/login'];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clients" element={<ClientsOverview />} />
        <Route path="/projects-overview" element={<CProjectsOverview />} />
        <Route path="/grid-dashboard" element={<GridDashboard />} />
        <Route path="/client-grid-dashboard" element={<ClientGridDashboard />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/project-status" element={<StatusPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/risks" element={<RisksPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
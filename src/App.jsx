import { useState, useEffect } from 'react'
import './styles/App.css'; 
import  Navbar from './components/navbar';
import { useTheme } from './hooks/useTheme';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all pages 
import BudgetPage from './pages/BudgetPage';
import ClientsOverview from './pages/ClientsOverview';
import CProjectsOverview from './pages/CProjectsOverview';
import GridDashboard from './pages/GridDashboard';
import LoginPage from './pages/LoginPage';
import Roadmap from './pages/Roadmap';
import StatusPage from './pages/StatusPage';
import RoadmapPage from './pages/Roadmap';
import RisksPage from './pages/RisksPage';
import UpdatesPage from './pages/UpdatesPage';


function App() {
  const { theme } = useTheme();

  return (
    <Router>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clients" element={<ClientsOverview />} />
        <Route path="/projects-overview" element={<CProjectsOverview />} />
        <Route path="/grid-dashboard" element={<GridDashboard />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/project-status" element={<StatusPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/risks" element={<RisksPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App

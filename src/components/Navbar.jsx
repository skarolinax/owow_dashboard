import React, { useEffect, useState, useRef } from 'react';
import Logo from '../assets/images/logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SettingsIcon from '../assets/images/settings.svg'
import SignOut from '../assets/images/signut.svg'
import MenuIcon from '../assets/images/menu.svg'

function Navbar({theme, toggleTheme}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLogout() {
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/grid-dashboard">
        <img src={Logo} alt="Logo of the agency" />
      </Link>

      <div className="links-navbar">
        <NavLink to="/grid-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          Overview
        </NavLink>

        <NavLink to="/project-status" className={({ isActive }) => isActive ? 'active' : ''}>
          Status
        </NavLink>

        <NavLink to="/budget" className={({ isActive }) => isActive ? 'active' : ''}>
          Budget
        </NavLink>

        <NavLink to="/risks" className={({ isActive }) => isActive ? 'active' : ''}>
          Risks
        </NavLink>

        <NavLink to="/roadmap" className={({ isActive }) => isActive ? 'active' : ''}>
          Roadmap
        </NavLink>

        <NavLink to="/updates" className={({ isActive }) => isActive ? 'active' : ''}>
          Updates
        </NavLink>
      </div>

      <button className="btn-mobile-nav" 
        aria-label="Toggle menu" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}      >
        <img src={MenuIcon} alt="Menu icon" />
      </button>
      
      {isMobileMenuOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="mobile-menu" ref={mobileMenuRef}>
            <NavLink to="/grid-dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
              Overview
            </NavLink>

            <NavLink to="/project-status" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
              Status
            </NavLink>

            <NavLink to="/budget" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
              Budget
            </NavLink>

            <NavLink to="/risks" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
              Risks
            </NavLink>

            <NavLink to="/roadmap" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
              Roadmap
            </NavLink>

            <NavLink to="/updates" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
              Updates
            </NavLink>

            <button onClick={toggleTheme}>
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            <button onClick={handleLogout} className="logout-btn">
              <img src={SignOut} alt="Signout icon" />
              Log Out
            </button>

          </div>
        </>
      )}

     <div className="settings-container" ref={dropdownRef}>
        <button className="btn-settings" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <img src={SettingsIcon} alt="Settings icon" />
        </button>

        {isDropdownOpen && (
          <div className="settings-dropdown">
            <button onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <img src={SignOut} alt="Signout icon" />
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
          
  );
}

export default Navbar;
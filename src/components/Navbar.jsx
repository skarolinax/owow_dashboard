import React from 'react';
import { useTheme } from '../hooks/useTheme';
import Logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/grid-dashboard">
        <img src={Logo} alt="Logo of the agency" />
      </Link>

      <div className='links-navbar'>
        <Link to="/grid-dashboard">
          <button>Overview</button>
        </Link>
        <Link to="/project-status">
          <button>Status</button>
        </Link>
        <Link to="/budget">
          <button>Budget</button>
        </Link>
        <Link to="/risks">
          <button>Risks</button>
        </Link>
        <Link to="/roadmap">
          <button>Roadmap</button>
        </Link>
        <Link to="/updates">
          <button>Updates</button>
        </Link>
      </div>

      <button>Settings</button>

      {/* <button onClick={toggleTheme}>
        {theme === 'dark' ? '🌞' : '🌙'}
      </button> */}
    </nav>
  );
}

export default Navbar;
import React, { useEffect, useState, useRef } from "react";
import Logo from "../assets/images/logo.svg";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SettingsIcon from "../assets/images/settings.svg";
import SignOut from "../assets/images/signut.svg";
import MenuIcon from "../assets/images/menu.svg";

function Navbar({ theme, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState(() => localStorage.getItem("owowRole") || "employee");

  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const hideLinks =
    location.pathname === "/clients" ||
    location.pathname === "/projects-overview";

  const disableLinks =
    location.pathname === "/clients" ||
    location.pathname === "/projects-overview";

  const hideMobileLinks =
    location.pathname === "/clients" ||
    location.pathname === "/projects-overview";

  // Keep current ?client=...&project=... when moving between project pages
  const currentSearch = location.search || "";
  const isClient = role === "client";

  const links = [
    { to: `${isClient ? '/client-grid-dashboard' : '/grid-dashboard'}${currentSearch}`, label: "Overview" },
    { to: `/project-status${currentSearch}`, label: "Status" },
    ...(!isClient ? [
      { to: `/budget${currentSearch}`, label: "Budget" },
      { to: `/risks${currentSearch}`, label: "Risks" },
    ] : []),
    { to: `/roadmap${currentSearch}`, label: "Roadmap" },
    { to: `/updates${currentSearch}`, label: "Updates" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("owowRole");
    localStorage.removeItem("owowClient");
    setRole("employee");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      {disableLinks ? (
        <img src={Logo} alt="Logo of the agency" />
      ) : (
        <Link to={`${isClient ? '/client-grid-dashboard' : '/grid-dashboard'}${currentSearch}`}>
          <img src={Logo} alt="Logo of the agency" />
        </Link>
      )}

      {!hideLinks && (
        <div className="links-navbar">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      <button
        className="btn-mobile-nav"
        aria-label="Toggle menu"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <img src={MenuIcon} alt="Menu icon" />
      </button>

      {isMobileMenuOpen && (
        <>
          <div
            className="overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="mobile-menu" ref={mobileMenuRef}>
            {!hideMobileLinks && (
              <div className="mobile-links-section">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            <aside className="btn-section">
              <button onClick={toggleTheme}>
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
              </button>

              <button onClick={handleLogout} className="logout-btn">
                <img src={SignOut} alt="Signout icon" />
                Log Out
              </button>
            </aside>
          </div>
        </>
      )}

      <div className="settings-container" ref={dropdownRef}>
        <button
          className="btn-settings"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img src={SettingsIcon} alt="Settings icon" />
        </button>

        {isDropdownOpen && (
          <div className="settings-dropdown" aria-label="Settings options">
            <button onClick={toggleTheme}>
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
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
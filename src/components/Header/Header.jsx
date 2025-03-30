import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Mock authentication state - in a real app, this would come from a context or state management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle authentication for demo purposes
  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsUserMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      
      if (isMenuOpen && !event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, isMenuOpen]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="contact-info">
              <span><i className="phone-icon">📞</i> 7019243492</span>
              <span><i className="email-icon">📧</i> support@example.com</span>
            </div>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                <i className="social-icon">Facebook</i>
              </a>
              <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                <i className="social-icon">Twitter</i>
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                <i className="social-icon">Instagram</i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            <div className="logo">
              <Link to="/">
                <img src="https://via.placeholder.com/150x50?text=EdTech+Logo" alt="Logo" className="logo-image" />
              </Link>
            </div>

            <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
              <ul>
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/courses/iit-jee" className="nav-link">Courses</Link></li>
                <li><Link to="/competitive-exams" className="nav-link">Competitive Exams</Link></li>
                <li><Link to="/school-prep" className="nav-link">School Prep</Link></li>
                <li><Link to="/govt-exam" className="nav-link">Govt Exam</Link></li>
                <li><Link to="/study-abroad" className="nav-link">Study Abroad</Link></li>
                {isLoggedIn && (
                  <>
                    <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                    <li><Link to="/study-materials/1" className="nav-link">Study Materials</Link></li>
                    <li><Link to="/live-class/1" className="nav-link">Live Classes</Link></li>
                    <li><Link to="/forum/1" className="nav-link">Discussion Forum</Link></li>
                  </>
                )}
              </ul>
            </nav>

            <div className="user-actions">
              <div className="user-menu">
                <button 
                  className="user-menu-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-expanded={isUserMenuOpen}
                >
                  <span>{isLoggedIn ? 'My Account' : 'Login'}</span>
                  <i className="dropdown-icon">{isUserMenuOpen ? '▲' : '▼'}</i>
                </button>
                {isUserMenuOpen && (
                  <div className="user-menu-dropdown">
                    {isLoggedIn ? (
                      <>
                        <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                        <Link to="/profile" className="dropdown-item">My Profile</Link>
                        <Link to="/my-courses" className="dropdown-item">My Courses</Link>
                        <button onClick={toggleAuth} className="logout-btn dropdown-item">Logout</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="dropdown-item">Login</Link>
                        <Link to="/register" className="dropdown-item">Register</Link>
                        <button onClick={toggleAuth} className="demo-login-btn dropdown-item">Demo Login</button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <button 
                className="mobile-menu-btn" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/updates">Updates</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Our Centres</h3>
              <ul>
                <li><Link to="/centres/new-delhi">New Delhi</Link></li>
                <li><Link to="/centres/patna">Patna</Link></li>
                <li><Link to="/centres/kota">Kota</Link></li>
                <li><Link to="/centres/noida">Noida</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Popular Exams</h3>
              <ul>
                <li><Link to="/exams/iit-jee">IIT JEE</Link></li>
                <li><Link to="/exams/neet">NEET</Link></li>
                <li><Link to="/exams/gate">GATE</Link></li>
                <li><Link to="/exams/upsc">UPSC</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Learning Resources</h3>
              <ul>
                <li><Link to="/resources/books">PW Books</Link></li>
                <li><Link to="/resources/notes">Notes</Link></li>
                <li><Link to="/resources/study-materials">Study Materials</Link></li>
                <li><Link to="/resources/ncert-solutions">NCERT Solutions</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Connect With Us</h3>
              <div className="social-links">
                <a href="https://facebook.com" className="social-link" aria-label="Facebook">
                  Facebook
                </a>
                <a href="https://twitter.com" className="social-link" aria-label="Twitter">
                  Twitter
                </a>
                <a href="https://instagram.com" className="social-link" aria-label="Instagram">
                  Instagram
                </a>
              </div>
              <div className="contact-info">
                <p><i className="phone-icon">📞</i> 7019243492</p>
                <p><i className="email-icon">📧</i> support@example.com</p>
              </div>
              <div className="newsletter">
                <h4>Subscribe to our Newsletter</h4>
                <form className="newsletter-form">
                  <input type="email" placeholder="Your email" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>© 2024 Your Company Name. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>

      <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
      </button>
    </footer>
  );
};

export default Footer; 
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './Auth.css';

const ForgotPassword = () => {
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
      const emailParts = formData.email.split('@');
      
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (emailParts[0].length < 2) {
        newErrors.email = 'Email username must be at least 2 characters';
      } else if (emailParts[0].length > 64) {
        newErrors.email = 'Email username cannot exceed 64 characters';
      } else if (emailParts[1].length > 255) {
        newErrors.email = 'Email domain cannot exceed 255 characters';
      } else if (!commonDomains.includes(emailParts[1].toLowerCase())) {
        newErrors.email = 'Please enter a valid email domain';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const recaptchaValue = recaptchaRef.current.getValue();
      if (!recaptchaValue) {
        setErrors(prev => ({ ...prev, recaptcha: 'Please complete the reCAPTCHA' }));
        return;
      }
      // Handle password reset logic here
      console.log('Password reset requested for:', formData.email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>RESET PASSWORD</h2>
            <p>Enter your email address and we'll send you instructions to reset your password.</p>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="YOUR_RECAPTCHA_SITE_KEY"
                  onChange={() => setErrors(prev => ({ ...prev, recaptcha: undefined }))}
                />
                {errors.recaptcha && <span className="error-message">{errors.recaptcha}</span>}
              </div>

              <button type="submit" className="auth-button">
                Send Reset Instructions
              </button>

              <div className="auth-switch">
                <p>Remember your password? <Link to="/login">Back to Login</Link></p>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Check Your Email</h3>
              <p>We've sent password reset instructions to {formData.email}</p>
              <p className="note">If you don't see the email, please check your spam folder.</p>
              <Link to="/login" className="auth-button">
                Return to Login
              </Link>
            </div>
          )}
        </div>
        
        <div className="auth-graphic">
          {/* Athletic silhouette graphic added via CSS */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 
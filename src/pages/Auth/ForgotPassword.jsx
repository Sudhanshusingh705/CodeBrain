import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './Auth.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate sending a password reset link
      console.log('Password reset link sent to:', formData.email);
      setSubmitted(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>FORGOT PASSWORD</h2>
            <p>Enter your email address to receive a password reset link.</p>
          </div>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <ReCAPTCHA
                  sitekey="YOUR_RECAPTCHA_SITE_KEY"
                  onChange={() => setErrors(prev => ({ ...prev, recaptcha: undefined }))}
                />
                {errors.recaptcha && <span className="error-message">{errors.recaptcha}</span>}
              </div>

              <button type="submit" className="auth-button">
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Check Your Email</h3>
              <p>We have sent a password reset link to your email address.</p>
              <p className="note">Please check your inbox and follow the instructions to reset your password.</p>
              <Link to="/login" className="auth-button">Back to Login</Link>
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
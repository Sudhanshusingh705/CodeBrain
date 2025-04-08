import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Enhanced email validation
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
        newErrors.email = 'Please enter a common email domain';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
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
      // Handle login logic here
      console.log('Form submitted:', formData);
      navigate('/dashboard');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    // Handle Google login logic here
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>WELCOME BACK</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>
          
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                /> 
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password
              </Link>
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
              Sign in
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="social-auth-buttons">
              <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="outline"
                  size="large"
                  width="100%"
                  text="Google"
                />
              </GoogleOAuthProvider>
              
              <button type="button" className="social-auth-button facebook">
                <i className="fab fa-facebook-f"></i>
                Facebook
              </button>
              
              <button type="button" className="social-auth-button twitter">
                <i className="fab fa-twitter"></i>
                Twitter
              </button>
            </div>

            <div className="auth-switch">
              <p>Don't have an account? <Link to="/register">Sign up to free!</Link></p>
            </div>
          </form>
        </div>
        
        <div className="auth-graphic">
          {/* Athletic silhouette graphic will be added via CSS */}
        </div>
      </div>
    </div>
  );
};

export default Login; 
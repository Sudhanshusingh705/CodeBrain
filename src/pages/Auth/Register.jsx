import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.split(' ').length < 2) {
      newErrors.fullName = 'Please enter both first and last name';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      const emailParts = formData.email.split('@');
      const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
      if (!commonDomains.includes(emailParts[1].toLowerCase())) {
        newErrors.email = 'Please enter a common email domain';
      }
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain only digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms and Conditions';
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
      // Handle registration logic here
      console.log('Form submitted:', formData);
      navigate('/login');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google registration success:', credentialResponse);
    // Handle Google registration logic here
  };

  const handleGoogleError = () => {
    console.log('Google registration failed');
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>CREATE ACCOUNT</h2>
            <p>Welcome! Please enter your details to register.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your First and Last Name"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

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
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                country={'us'}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone',
                  required: true,
                  className: errors.phone ? 'error' : ''
                }}
                containerClass="phone-input-container"
                buttonClass="phone-input-button"
                inputClass="phone-input-field"
                dropdownClass="phone-input-dropdown"
                searchClass="phone-input-search"
                searchPlaceholder="Search country..."
                enableSearch={true}
                disableSearchIcon={false}
                searchNotFound="No results found"
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group terms-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                /> 
                I agree to the Terms and Conditions
              </label>
              {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
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
              Sign up
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
                  text="continue_with"
                />
              </GoogleOAuthProvider>
              
              <button type="button" className="social-auth-button facebook">
                <i className="fab fa-facebook-f"></i>
                Continue with Facebook
              </button>
              
              <button type="button" className="social-auth-button twitter">
                <i className="fab fa-twitter"></i>
                Continue with Twitter
              </button>
            </div>

            <div className="auth-switch">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
          </form>
        </div>
        
        <div className="auth-graphic">
          {/* Athletic silhouette graphic added via CSS */}
        </div>
      </div>
    </div>
  );
};

export default Register; 
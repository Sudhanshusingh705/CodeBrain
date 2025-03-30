import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Enrollment.css';

// Mock data - would be fetched from API in real implementation
const coursesData = {
  'iit-jee': {
    id: 'iit-jee',
    title: 'IIT JEE Preparation',
    image: '/images/course1.jpg',
    price: 9999,
    discountedPrice: 7999,
    duration: '12 months',
  },
  'neet': {
    id: 'neet',
    title: 'NEET Preparation',
    image: '/images/course2.jpg',
    price: 8999,
    discountedPrice: 6999,
    duration: '12 months',
  }
};

const Enrollment = () => {
  const { courseId } = useParams();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
  });
  const [errors, setErrors] = useState({});

  // In a real app, you would fetch this data from an API
  const course = coursesData[courseId];

  if (!course) {
    return <div className="enrollment-not-found">Course not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentInfo = () => {
    const newErrors = {};
    
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!formData.cardName) {
        newErrors.cardName = 'Name on card is required';
      }
      
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Expiry date is required';
      }
      
      if (!formData.cardCvv) {
        newErrors.cardCvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = 'CVV must be 3 or 4 digits';
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/.test(formData.upiId)) {
        newErrors.upiId = 'Enter a valid UPI ID';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === 1 && validatePersonalInfo()) {
      setActiveStep(2);
    } else if (activeStep === 2 && validatePaymentInfo()) {
      // In a real app, you would send payment data to a payment processor
      setActiveStep(3);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <div className="enrollment-page">
      <div className="container">
        <div className="enrollment-content">
          <div className="enrollment-header">
            <h1>Enroll in {course.title}</h1>
            <div className="enrollment-steps">
              <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-text">Personal Information</div>
              </div>
              <div className="step-separator"></div>
              <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-text">Payment</div>
              </div>
              <div className="step-separator"></div>
              <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-text">Confirmation</div>
              </div>
            </div>
          </div>

          <div className="enrollment-form-container">
            {activeStep === 1 && (
              <form onSubmit={handleSubmit} className="enrollment-form">
                <h2>Personal Information</h2>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pincode">PIN Code</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-next">Continue to Payment</button>
                </div>
              </form>
            )}

            {activeStep === 2 && (
              <form onSubmit={handleSubmit} className="enrollment-form">
                <h2>Payment Information</h2>
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="credit-card"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleChange}
                    />
                    <label htmlFor="credit-card">
                      <span className="payment-icon">💳</span>
                      Credit/Debit Card
                    </label>
                  </div>

                  <div className="payment-method">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                    />
                    <label htmlFor="upi">
                      <span className="payment-icon">📱</span>
                      UPI Payment
                    </label>
                  </div>

                  <div className="payment-method">
                    <input
                      type="radio"
                      id="netbanking"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleChange}
                    />
                    <label htmlFor="netbanking">
                      <span className="payment-icon">🏦</span>
                      Net Banking
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'credit-card' && (
                  <div className="payment-details">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardName">Name on Card</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={errors.cardName ? 'error' : ''}
                      />
                      {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Expiry Date</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className={errors.cardExpiry ? 'error' : ''}
                        />
                        {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardCvv">CVV</label>
                        <input
                          type="text"
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="123"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          className={errors.cardCvv ? 'error' : ''}
                        />
                        {errors.cardCvv && <span className="error-message">{errors.cardCvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'upi' && (
                  <div className="payment-details">
                    <div className="form-group">
                      <label htmlFor="upiId">UPI ID</label>
                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        placeholder="example@upi"
                        value={formData.upiId}
                        onChange={handleChange}
                        className={errors.upiId ? 'error' : ''}
                      />
                      {errors.upiId && <span className="error-message">{errors.upiId}</span>}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <div className="payment-details">
                    <div className="netbanking-banks">
                      <div className="bank-option">
                        <input type="radio" id="sbi" name="bank" value="sbi" />
                        <label htmlFor="sbi">SBI</label>
                      </div>
                      <div className="bank-option">
                        <input type="radio" id="hdfc" name="bank" value="hdfc" />
                        <label htmlFor="hdfc">HDFC</label>
                      </div>
                      <div className="bank-option">
                        <input type="radio" id="icici" name="bank" value="icici" />
                        <label htmlFor="icici">ICICI</label>
                      </div>
                      <div className="bank-option">
                        <input type="radio" id="axis" name="bank" value="axis" />
                        <label htmlFor="axis">Axis</label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" className="btn-back" onClick={handleBack}>
                    Back
                  </button>
                  <button type="submit" className="btn-next">
                    Make Payment
                  </button>
                </div>
              </form>
            )}

            {activeStep === 3 && (
              <div className="enrollment-confirmation">
                <div className="confirmation-icon">✅</div>
                <h2>Payment Successful!</h2>
                <p>Thank you for enrolling in <strong>{course.title}</strong>.</p>
                <p>Your enrollment has been confirmed and you can now access the course materials.</p>
                <div className="confirmation-details">
                  <div className="detail-item">
                    <span>Order ID:</span>
                    <span>ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  </div>
                  <div className="detail-item">
                    <span>Amount Paid:</span>
                    <span>₹{course.discountedPrice.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span>Course Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="confirmation-actions">
                  <Link to="/dashboard" className="btn-dashboard">
                    Go to Dashboard
                  </Link>
                  <Link to={`/courses/${courseId}`} className="btn-view-course">
                    View Course
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="enrollment-summary">
            <div className="course-summary">
              <img src={course.image} alt={course.title} className="course-image" />
              <h3>{course.title}</h3>
              <div className="course-price">
                <span className="discounted-price">₹{course.discountedPrice.toLocaleString()}</span>
                <span className="original-price">₹{course.price.toLocaleString()}</span>
                <span className="discount-percentage">
                  {Math.round((1 - course.discountedPrice / course.price) * 100)}% OFF
                </span>
              </div>
              <div className="price-details">
                <div className="price-item">
                  <span>Course Price</span>
                  <span>₹{course.price.toLocaleString()}</span>
                </div>
                <div className="price-item discount">
                  <span>Discount</span>
                  <span>- ₹{(course.price - course.discountedPrice).toLocaleString()}</span>
                </div>
                <div className="price-item total">
                  <span>Total</span>
                  <span>₹{course.discountedPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="offer-banner">
                <p>🔥 Limited time offer valid for next 2 days!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment; 
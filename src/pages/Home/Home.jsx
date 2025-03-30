import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    courses: false,
    stories: false,
    app: false
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = 6; // Total number of category cards
  const [visibleSlides, setVisibleSlides] = useState(
    window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3
  );

  // Update visible slides on window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleSlides = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
      setVisibleSlides(newVisibleSlides);
      
      // Ensure current slide index is still valid
      if (currentSlide > totalSlides - newVisibleSlides) {
        setCurrentSlide(Math.max(0, totalSlides - newVisibleSlides));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSlide, totalSlides]);

  // Handle slider navigation
  const handleSlideChange = (direction) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.querySelector('.category-card').offsetWidth + 20; // card width + gap
      const scrollAmount = direction === 'next' 
        ? sliderRef.current.scrollLeft + slideWidth
        : sliderRef.current.scrollLeft - slideWidth;
      
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Update the current slide
      const newSlide = direction === 'next' 
        ? Math.min(currentSlide + 1, totalSlides - visibleSlides) 
        : Math.max(currentSlide - 1, 0);
      
      setCurrentSlide(newSlide);
    }
  };
  
  // Handle pagination click
  const handlePaginationClick = (index) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.querySelector('.category-card').offsetWidth + 20; // card width + gap
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  // Add animation when elements come into view
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const sections = ['features', 'courses', 'stories', 'app'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Bharat's Trusted & Affordable Educational Platform</h1>
            <p>Unlock your potential by signing up with our platform - The most affordable learning solution</p>
            <Link to="/register" className="cta-button">Get Started</Link>
          </div>
        </div>
        <div className="waves">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Key Features Highlight */}
      <section className="key-features-highlight">
        <div className="container">
          <div className="features-highlight-grid">
            <div className="feature-highlight-item">
              <div className="feature-highlight-icon" style={{background: "#ffebee"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#f44336">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
              </div>
              <h3>Daily Live</h3>
              <p>Interactive classes</p>
            </div>
            
            <div className="feature-highlight-item">
              <div className="feature-highlight-icon" style={{background: "#e3f2fd"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#2196f3">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
              </div>
              <h3>10 Million +</h3>
              <p>Tests, sample papers & notes</p>
            </div>
            
            <div className="feature-highlight-item">
              <div className="feature-highlight-icon" style={{background: "#f3e5f5"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#9c27b0">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
                </svg>
              </div>
              <h3>24 x 7</h3>
              <p>Doubt solving sessions</p>
            </div>
            
            <div className="feature-highlight-item">
              <div className="feature-highlight-icon" style={{background: "#fff8e1"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ffc107">
                  <path d="M12 7V3H2v18h20V7H12zM10 19H4v-2h6v2zm0-4H4v-2h6v2zm0-4H4V9h6v2zm0-4H4V5h6v2zm10 12h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V9h8v2z"/>
                </svg>
              </div>
              <h3>100 +</h3>
              <p>Offline centres</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Categories Section */}
      <section className="exam-categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Exam Categories</h2>
            <p>PW is preparing students for 35+ exam categories. Scroll to find the one you are preparing for</p>
          </div>
          
          <div className="categories-slider-container">
            <button 
              className="slider-control prev-btn" 
              aria-label="Previous categories"
              onClick={() => handleSlideChange('prev')}
              disabled={currentSlide === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="categories-slider" ref={sliderRef}>
              <div className="category-card">
                <div className="category-content">
                  <h3>NEET</h3>
                  <div className="category-classes">
                    <span className="class-tag">class 11</span>
                    <span className="class-tag">class 12</span>
                  </div>
                  <div className="category-classes">
                    <span className="class-tag">Dropper</span>
                  </div>
                  <Link to="/courses/neet" className="explore-link">
                    Explore Category
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
                <div className="category-icon neet-icon"></div>
              </div>
              
              <div className="category-card">
                <div className="category-content">
                  <h3>IIT JEE</h3>
                  <div className="category-classes">
                    <span className="class-tag">class 11</span>
                    <span className="class-tag">class 12</span>
                  </div>
                  <div className="category-classes">
                    <span className="class-tag">Dropper</span>
                  </div>
                  <Link to="/courses/iit-jee" className="explore-link">
                    Explore Category
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
                <div className="category-icon jee-icon"></div>
              </div>
              
              <div className="category-card">
                <div className="category-content">
                  <h3>School Preparation</h3>
                  <div className="category-classes">
                    <span className="class-tag">class 6</span>
                    <span className="class-tag">class 7</span>
                  </div>
                  <div className="category-classes">
                    <span className="class-tag">class 8</span>
                    <span className="class-tag">More ↓</span>
                  </div>
                  <Link to="/courses/school-prep" className="explore-link">
                    Explore Category
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
                <div className="category-icon school-icon"></div>
              </div>
              
              <div className="category-card">
                <div className="category-content">
                  <h3>UPSC</h3>
                  <Link to="/courses/upsc" className="explore-link">
                    Explore Category
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
                <div className="category-icon upsc-icon"></div>
              </div>
              
              <div className="category-card">
                <div className="category-content">
                  <h3>Govt Job Exams</h3>
                  <div className="category-classes">
                    <span className="class-tag">SSC</span>
                    <span className="class-tag">Banking</span>
                  </div>
                  <div className="category-classes">
                    <span className="class-tag">Teaching</span>
                    <span className="class-tag">Judiciary</span>
                  </div>
                  <Link to="/courses/govt-job" className="explore-link">
                    Explore Category
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
                <div className="category-icon govt-icon"></div>
              </div>
              
              <div className="category-card">
                <div className="category-content">
                  <h3>Defence</h3>
                  <div className="category-classes">
                    <span className="class-tag">NDA</span>
                    <span className="class-tag">CDS</span>
                  </div>
                  <div className="category-classes">
                    <span className="class-tag">AFCAT</span>
                    <span className="class-tag">Agniveer</span>
                  </div>
                  <Link to="/courses/defence" className="explore-link">
                    Explore Category
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
                <div className="category-icon defence-icon"></div>
              </div>
            </div>
            
            <button 
              className="slider-control next-btn" 
              aria-label="Next categories"
              onClick={() => handleSlideChange('next')}
              disabled={currentSlide >= totalSlides - visibleSlides}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="slider-pagination">
            {[...Array(Math.ceil(totalSlides / visibleSlides))].map((_, index) => (
              <span 
                key={index} 
                className={`pagination-dot ${currentSlide === index * visibleSlides ? 'active' : ''}`}
                onClick={() => handlePaginationClick(index * visibleSlides)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`features-section ${isVisible.features ? 'animate-in' : ''}`}>
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎥</div>
              <h3>Daily Live Interactive Classes</h3>
              <p>Learn from expert teachers in real-time interactive sessions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>10 Million+ Resources</h3>
              <p>Access to tests, sample papers & study materials</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❓</div>
              <h3>24x7 Doubt Solving</h3>
              <p>Get your doubts cleared anytime, anywhere</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏫</div>
              <h3>100+ Offline Centres</h3>
              <p>Physical learning centers across the country</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section id="courses" className={`courses-section ${isVisible.courses ? 'animate-in' : ''}`}>
        <div className="container">
          <h2>Popular Courses</h2>
          <div className="courses-grid">
            <div className="course-card">
              <div className="course-image-wrapper">
                <img src="https://via.placeholder.com/400x300?text=IIT+JEE" alt="IIT JEE Course" />
                <div className="course-overlay">
                  <span className="students-enrolled">5.2k+ students</span>
                  <span className="course-rating">★★★★★ 4.9</span>
                </div>
              </div>
              <h3>IIT JEE</h3>
              <p>Comprehensive preparation for IIT JEE Main & Advanced</p>
              <Link to="/courses/iit-jee" className="course-link">Learn More</Link>
            </div>
            <div className="course-card">
              <div className="course-image-wrapper">
                <img src="https://via.placeholder.com/400x300?text=NEET" alt="NEET Course" />
                <div className="course-overlay">
                  <span className="students-enrolled">7.8k+ students</span>
                  <span className="course-rating">★★★★★ 4.8</span>
                </div>
              </div>
              <h3>NEET</h3>
              <p>Complete NEET preparation with expert guidance</p>
              <Link to="/courses/neet" className="course-link">Learn More</Link>
            </div>
            <div className="course-card">
              <div className="course-image-wrapper">
                <img src="https://via.placeholder.com/400x300?text=UPSC" alt="UPSC Course" />
                <div className="course-overlay">
                  <span className="students-enrolled">3.5k+ students</span>
                  <span className="course-rating">★★★★★ 4.7</span>
                </div>
              </div>
              <h3>UPSC</h3>
              <p>Structured preparation for UPSC Civil Services</p>
              <Link to="/courses/upsc" className="course-link">Learn More</Link>
            </div>
            <div className="course-card">
              <div className="course-image-wrapper">
                <img src="https://via.placeholder.com/400x300?text=GATE" alt="GATE Course" />
                <div className="course-overlay">
                  <span className="students-enrolled">2.9k+ students</span>
                  <span className="course-rating">★★★★★ 4.8</span>
                </div>
              </div>
              <h3>GATE</h3>
              <p>Expert guidance for GATE examination</p>
              <Link to="/courses/gate" className="course-link">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className={`success-stories-section ${isVisible.stories ? 'animate-in' : ''}`}>
        <div className="container">
          <h2>Student Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="student-image">
                <img src="https://via.placeholder.com/100x100?text=Student" alt="Student 1" />
              </div>
              <div className="story-content">
                <h3>Rahul Kumar</h3>
                <p className="achievement">AIR 1 in NEET 2024</p>
                <p className="testimonial">"The structured approach and quality content helped me achieve my dream rank."</p>
              </div>
            </div>
            <div className="story-card">
              <div className="student-image">
                <img src="https://via.placeholder.com/100x100?text=Student" alt="Student 2" />
              </div>
              <div className="story-content">
                <h3>Priya Sharma</h3>
                <p className="achievement">AIR 52 in JEE Advanced 2024</p>
                <p className="testimonial">"The doubt solving sessions and practice tests were game-changers for me."</p>
              </div>
            </div>
          </div>
          
          <div className="statistics">
            <div className="stat-item">
              <div className="stat-number">1M+</div>
              <div className="stat-description">Happy Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5k+</div>
              <div className="stat-description">Top Selections</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-description">Centers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">300+</div>
              <div className="stat-description">Expert Teachers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section id="app" className={`app-section ${isVisible.app ? 'animate-in' : ''}`}>
        <div className="container">
          <div className="app-content">
            <div className="app-text">
              <h2>Download Our App</h2>
              <p>Get access to all our courses and features on the go!</p>
              <ul className="app-features">
                <li>✓ Offline video lectures</li>
                <li>✓ Interactive quizzes & tests</li>
                <li>✓ Live doubt solving</li>
                <li>✓ Performance analytics</li>
              </ul>
              <div className="app-buttons">
                <a href="https://play.google.com/store" className="app-button">
                  <img src="https://via.placeholder.com/150x50?text=Google+Play" alt="Get it on Google Play" />
                </a>
                <a href="https://www.apple.com/app-store/" className="app-button">
                  <img src="https://via.placeholder.com/150x50?text=App+Store" alt="Download on App Store" />
                </a>
              </div>
            </div>
            <div className="app-image">
              <img src="https://via.placeholder.com/300x600?text=App+Preview" alt="App Preview" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
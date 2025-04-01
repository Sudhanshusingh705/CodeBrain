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
  const [activeTab, setActiveTab] = useState('All');
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [activeStoryTab, setActiveStoryTab] = useState('students');
  const sliderRef = useRef(null);
  const [visibleSlides, setVisibleSlides] = useState(
    window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3
  );

  // Add these state variables and references for Popular Courses slider
  const coursesSliderRef = useRef(null);
  const [currentCourseSlide, setCurrentCourseSlide] = useState(0);
  const [visibleCourseSlides, setVisibleCourseSlides] = useState(
    window.innerWidth < 480 ? 1 : 
    window.innerWidth < 992 ? 2 : 
    window.innerWidth < 1200 ? 3 : 4
  );

  // Hero carousel data
  const heroSlides = [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/medium-shot-woman-teaching-class_23-2149038268.jpg?t=st=1742996400~exp=1743000000~hmac=4a0a3cc2ce4649fc3c2ff6b97cccdbd3c80e2e4b7dc9e42de892c731ec4e8ccb",
      title: "Let's Code Brain Trusted & Affordable Educational Platform",
      description: "Unlock your potential by signing up with our platform - The most affordable learning solution"
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-photo/students-knowing-right-answer_23-2149038280.jpg?t=st=1742996451~exp=1743000051~hmac=20ef0c729e1e4a51c9e0dff68d3a8ff0a08d698d32df17ae2d76b1c56f4494d3",
      title: "Personalized Learning Journey",
      description: "Tailored courses designed to match your learning pace and style"
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-photo/blonde-woman-writing-notebook_23-2148038680.jpg?t=st=1742996500~exp=1743000100~hmac=48f37e74f2c5dc6d329e399187c7a7bfdf5f46bc5ffa2be4dcf9f05dd8be5d50",
      title: "Expert-Led Live Classes",
      description: "Learn directly from industry experts through interactive live sessions"
    },
    {
      id: 4,
      image: "https://img.freepik.com/free-photo/coach-teaching-kid-science_23-2149038349.jpg?t=st=1742996547~exp=1743000147~hmac=9de8dc887d58bf9ced7cc38d2f8c78dc9da20b7daf6f39ac54cf9b7a9ead48d1",
      title: "Comprehensive Study Materials",
      description: "Access to 10+ million tests, sample papers, and detailed notes"
    }
  ];

  // Auto-advance hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Handle hero slide navigation
  const handleHeroSlideChange = (index) => {
    setCurrentHeroSlide(index);
  };

  // Category data with their respective tabs
  const categoryData = [
    {
      id: 1,
      title: "Data Science Bootcamp",
      classes: [
        ["3 months", "6 months"],
        ["Certification", "Job Guarantee"]
      ],
      link: "/courses/data-science",
      iconClass: "data-science-icon",
      tabs: ["All", "DataScience"]
    },
    {
      id: 2,
      title: "AI/ML Advanced",
      classes: [
        ["Beginner", "Intermediate"],
        ["Advanced", "Certification"]
      ],
      link: "/courses/ai-ml",
      iconClass: "ai-ml-icon",
      tabs: ["All", "AI/ML"]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      classes: [
        ["MERN Stack", "Java Full Stack"],
        ["Python Full Stack", "More ↓"]
      ],
      link: "/courses/full-stack",
      iconClass: "full-stack-icon",
      tabs: ["All", "Full Stack Development"]
    },
    {
      id: 4,
      title: "Digital Marketing",
      classes: [
        ["SEO", "Social Media"],
        ["Content", "Analytics"]
      ],
      link: "/courses/digital-marketing",
      iconClass: "digital-marketing-icon",
      tabs: ["All", "Digital Marketing"]
    },
    {
      id: 5,
      title: "NEET",
      classes: [
        ["class 11", "class 12"],
        ["Dropper"]
      ],
      link: "/courses/neet",
      iconClass: "neet-icon",
      tabs: ["All"]
    },
    {
      id: 6,
      title: "IIT JEE",
      classes: [
        ["class 11", "class 12"],
        ["Dropper"]
      ],
      link: "/courses/iit-jee",
      iconClass: "jee-icon",
      tabs: ["All"]
    }
  ];

  // Filter categories based on active tab
  const filteredCategories = categoryData.filter(category => 
    category.tabs.includes(activeTab)
  );

  // Update visible slides on window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleSlides = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
      setVisibleSlides(newVisibleSlides);
      
      // Ensure current slide index is still valid
      if (currentSlide > filteredCategories.length - newVisibleSlides) {
        setCurrentSlide(Math.max(0, filteredCategories.length - newVisibleSlides));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSlide, filteredCategories.length]);

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
        ? Math.min(currentSlide + 1, filteredCategories.length - visibleSlides) 
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

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentSlide(0);
    
    // Reset slider scroll position
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
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

  // Popular courses data
  const popularCourses = [
    {
      id: 1,
      title: "IIT JEE",
      description: "Comprehensive preparation for IIT JEE Main & Advanced",
      image: "https://img.freepik.com/free-vector/flat-design-science-webinar_23-2149133029.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid",
      studentsEnrolled: "5.2k+",
      rating: "4.9",
      link: "/courses/iit-jee"
    },
    {
      id: 2,
      title: "NEET",
      description: "Complete NEET preparation with expert guidance",
      image: "https://img.freepik.com/free-vector/flat-design-science-sale-background_23-2149166790.jpg?t=st=1743353076~exp=1743356676~hmac=0b0ffc9e390d64f66d495712117942a2ae55d5230847361cd8836ff66a9cf411&w=1060",
      studentsEnrolled: "7.8k+",
      rating: "4.8",
      link: "/courses/neet"
    },
    {
      id: 3,
      title: "UPSC",
      description: "Structured preparation for UPSC Civil Services",
      image: "https://img.freepik.com/free-psd/science-banner-template-with-photo_23-2149035976.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid",
      studentsEnrolled: "3.5k+",
      rating: "4.7",
      link: "/courses/upsc"
    },
    {
      id: 4,
      title: "GATE",
      description: "Expert guidance for GATE examination",
      image: "https://img.freepik.com/free-vector/gradient-science-youtube-channel-art_23-2149487153.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid",
      studentsEnrolled: "2.9k+",
      rating: "4.8",
      link: "/courses/gate"
    },
    {
      id: 5,
      title: "Data Science",
      description: "Master data science with hands-on projects",
      image: "https://img.freepik.com/free-vector/hand-drawn-online-college-template-design_23-2150574159.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid",
      studentsEnrolled: "4.3k+",
      rating: "4.9",
      link: "/courses/data-science"
    },
    {
      id: 6,
      title: "Machine Learning",
      description: "Comprehensive AI/ML course with real-world applications",
      image: "https://img.freepik.com/free-psd/e-learning-banner-design-template_23-2149113593.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid",
      studentsEnrolled: "3.7k+",
      rating: "4.7",
      link: "/courses/machine-learning"
    }
  ];

  // Update visible slides on window resize (for both sliders)
  useEffect(() => {
    const handleResize = () => {
      const newVisibleSlides = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
      setVisibleSlides(newVisibleSlides);
      
      const newVisibleCourseSlides = window.innerWidth < 480 ? 1 : 
        window.innerWidth < 992 ? 2 : 
        window.innerWidth < 1200 ? 3 : 4;
      setVisibleCourseSlides(newVisibleCourseSlides);
      
      // Ensure current slide indices are still valid
      if (currentSlide > filteredCategories.length - newVisibleSlides) {
        setCurrentSlide(Math.max(0, filteredCategories.length - newVisibleSlides));
      }
      
      // For course slider, check we're not showing empty cards
      const cardsPerView = newVisibleCourseSlides * 2;
      if (currentCourseSlide > popularCourses.length - cardsPerView) {
        const maxStartIndex = Math.max(0, popularCourses.length - cardsPerView);
        setCurrentCourseSlide(maxStartIndex);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSlide, filteredCategories.length, currentCourseSlide, popularCourses.length]);

  // Handle course slider navigation
  const handleCourseSlideChange = (direction) => {
    // Calculate the number of cards to display in one view
    const cardsPerView = visibleCourseSlides * 2;
    
    // Calculate the step size for navigation
    const step = cardsPerView;
    
    if (direction === 'next') {
      const nextSlide = Math.min(currentCourseSlide + step, popularCourses.length - cardsPerView);
      setCurrentCourseSlide(nextSlide);
    } else {
      const prevSlide = Math.max(0, currentCourseSlide - step);
      setCurrentCourseSlide(prevSlide);
      
    }
  };
  
  // Handle course pagination click
  const handleCoursePaginationClick = (index) => {
    setCurrentCourseSlide(index);
  };

  return (
    <div className="home">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="hero-carousel">
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`hero-slide ${index === currentHeroSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(25, 47, 89, 0.7), rgba(40, 58, 90, 0.8)), url(${slide.image})` }}
            >
              <div className="container">
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <Link to="/register" className="cta-button">Get Started</Link>
                </div>
              </div>
            </div>
          ))}
          
          <div className="hero-carousel-controls">
            <button 
              className="carousel-control prev-btn" 
              onClick={() => setCurrentHeroSlide((currentHeroSlide - 1 + heroSlides.length) % heroSlides.length)}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="carousel-pagination">
              {heroSlides.map((_, index) => (
                <span 
                  key={index}
                  className={`carousel-dot ${index === currentHeroSlide ? 'active' : ''}`}
                  onClick={() => handleHeroSlideChange(index)}
                ></span>
              ))}
            </div>
            
            <button 
              className="carousel-control next-btn" 
              onClick={() => setCurrentHeroSlide((currentHeroSlide + 1) % heroSlides.length)}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="waves">
          <svg xmlns="https://img.freepik.com/free-psd/flat-design-world-hepatitis-day-facebook-template_23-2150428372.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid" viewBox="0 0 1440 320" preserveAspectRatio="none">
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
            <h2>Explore Course Categories</h2>
            {/*<p>Lets Code Brain is preparing students for 35+ exam categories. Scroll to find the one you are preparing for</p>*/}
          </div>
          
          <div className="category-tabs">
            {['All', 'DataScience', 'AI/ML', 'Full Stack Development', 'Digital Marketing'].map(tab => (
              <button 
                key={tab} 
                className={`category-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
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
              {filteredCategories.map(category => (
                <div className="category-card" key={category.id}>
                  <div className="category-content">
                    <h3>{category.title}</h3>
                    {category.classes.map((classRow, rowIndex) => (
                      <div className="category-classes" key={rowIndex}>
                        {classRow.map((className, index) => (
                          <span className="class-tag" key={index}>{className}</span>
                        ))}
                      </div>
                    ))}
                    <Link to={category.link} className="explore-link">
                      Explore Category
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                  <div className={`category-icon ${category.iconClass}`}></div>
                </div>
              ))}
            </div>
            
            <button 
              className="slider-control next-btn" 
              aria-label="Next categories"
              onClick={() => handleSlideChange('next')}
              disabled={currentSlide >= filteredCategories.length - visibleSlides}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="slider-pagination">
            {[...Array(Math.max(1, Math.ceil((filteredCategories.length - visibleSlides + 1) / visibleSlides)))].map((_, index) => (
              <span 
                key={index} 
                className={`pagination-dot ${currentSlide >= index * visibleSlides && currentSlide < (index + 1) * visibleSlides ? 'active' : ''}`}
                onClick={() => handlePaginationClick(index * visibleSlides)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
     {/* <section id="features" className={`features-section ${isVisible.features ? 'animate-in' : ''}`}>
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
      </section>*/}

      {/* Popular Courses Section */}
      <section id="courses" className={`courses-section ${isVisible.courses ? 'animate-in' : ''}`}>
        <div className="container">
          <h2>Popular Courses</h2>
          
          <div className="courses-slider-container">
            <button 
              className="slider-control prev-btn" 
              aria-label="Previous courses"
              onClick={() => handleCourseSlideChange('prev')}
              disabled={currentCourseSlide === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div className="courses-slider" ref={coursesSliderRef}>
              {popularCourses
                .slice(currentCourseSlide, currentCourseSlide + (visibleCourseSlides * 2))
                .map(course => (
                <div className="course-card" key={course.id}>
                  <div className="course-image-wrapper">
                    <img src={course.image} alt={`${course.title} Course`} />
                    <div className="course-overlay">
                      <span className="students-enrolled">{course.studentsEnrolled} students</span>
                      <span className="course-rating">★★★★★ {course.rating}</span>
                    </div>
                  </div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link to={course.link} className="course-link">Learn More</Link>
                </div>
              ))}
            </div>
            
            <button 
              className="slider-control next-btn" 
              aria-label="Next courses"
              onClick={() => handleCourseSlideChange('next')}
              disabled={currentCourseSlide >= popularCourses.length - (visibleCourseSlides * 2)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="slider-pagination">
            {[...Array(Math.ceil(popularCourses.length / (visibleCourseSlides * 2)))].map((_, index) => (
              <span 
                key={index} 
                className={`pagination-dot ${currentCourseSlide === index * (visibleCourseSlides * 2) ? 'active' : ''}`}
                onClick={() => handleCoursePaginationClick(index * (visibleCourseSlides * 2))}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className={`success-stories-section ${isVisible.stories ? 'animate-in' : ''}`}>
        <div className="container">
          <h2>Success Stories</h2>
          <div className="stories-tabs">
            <button 
              className={`story-tab ${activeStoryTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveStoryTab('students')}
            >
              Student Testimonials
            </button>
            <button 
              className={`story-tab ${activeStoryTab === 'instructors' ? 'active' : ''}`}
              onClick={() => setActiveStoryTab('instructors')}
            >
              Instructor Insights
            </button>
          </div>
          
          {activeStoryTab === 'students' ? (
            <div className="stories-grid student-stories">
              <div className="story-card">
                <div className="student-image">
                  <img src="https://media.licdn.com/dms/image/v2/D5603AQGa_wu070ujtA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706252126089?e=1749081600&v=beta&t=8wyNOyb5gP8lzPsqUBWuU0f_qmRes1Tcbl4Bz7qKDRY" alt="Student 1" />
                </div>
                <div className="story-content">
                  <h3>Sudhanshu Singh</h3>
                  <p className="achievement">AIR 1 in NEET 2024</p>
                  <p className="testimonial">"The structured approach and quality content helped me achieve my dream rank."</p>
                </div>
              </div>
              <div className="story-card">
                <div className="student-image">
                  <img src="https://media.licdn.com/dms/image/v2/D5603AQEX0C9R-6HtTA/profile-displayphoto-shrink_200_200/B56ZOLfQDeGgAY-/0/1733212046964?e=2147483647&v=beta&t=W3vQ9VE8_gg3LulUQrzPiH0M6JYfTD5wVcwARlpRDpc" alt="Student 2" />
                </div>
                <div className="story-content">
                  <h3>Vijay Laxmi</h3>
                  <p className="achievement">AIR 52 in JEE Advanced 2024</p>
                  <p className="testimonial">"The doubt solving sessions and practice tests were game-changers for me."</p>
                </div>
              </div>
              <div className="story-card">
                <div className="student-image">
                  <img src="https://media.licdn.com/dms/image/v2/D5603AQG4cSOjP3GOsg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730704850153?e=1749081600&v=beta&t=q_bYqr9dmVu-zQGCyEIdiE6Wwwkoj3zljzheC-LPJB8" alt="Student 3" />
                </div>
                <div className="story-content">
                  <h3>Sudhanshu Mishra</h3>
                  <p className="achievement">Selected in Google after ML Course</p>
                  <p className="testimonial">"The practical approach to ML concepts and real-world projects gave me the edge in interviews."</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="stories-grid instructor-stories">
              <div className="story-card instructor-card">
                <div className="instructor-image">
                  <img src="https://media.licdn.com/dms/image/v2/D5603AQHU5vMmUZo68g/profile-displayphoto-shrink_200_200/B56ZXaziWDGsAc-/0/1743132700896?e=2147483647&v=beta&t=Q_FVKCtSlvciz_vd84CsnyhuPZZsKGHbiEtwtvh2PcA" alt="Instructor 1" />
                </div>
                <div className="story-content">
                  <h3>Dr. Rajesh Kumar</h3>
                  <p className="achievement">10+ Years Teaching Physics, IIT Delhi Alumni</p>
                  <p className="testimonial">"It's incredibly rewarding to see my students succeed at the highest levels. Our approach of conceptual clarity combined with problem-solving has proven extremely effective."</p>
                </div>
              </div>
              <div className="story-card instructor-card">
                <div className="instructor-image">
                  <img src="https://media.licdn.com/dms/image/v2/D5603AQEvWWVOHRoaNA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1711897708289?e=2147483647&v=beta&t=gWHdmw0YsRu8-e7wasdGYNjmcScPBxRGUyfdVRCYORI" alt="Instructor 2" />
                </div>
                <div className="story-content">
                  <h3>Prof. Jashpreet Kaur</h3>
                  <p className="achievement">Senior Data Science Instructor, Ex-Google</p>
                  <p className="testimonial">"My focus is on teaching practical skills that are directly applicable in the industry. I'm proud that over 500 of my students now work in leading tech companies worldwide."</p>
                </div>
              </div>
              <div className="story-card instructor-card">
                <div className="instructor-image">
                  <img src="https://media.licdn.com/dms/image/v2/D5603AQHRINwgJAn4Zw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706377538408?e=2147483647&v=beta&t=_v5YCGf9CJYZ6dY2mDh4O3YeGx5LTW5LXCeAU2jOKRo" alt="Instructor 3" />
                </div>
                <div className="story-content">
                  <h3>Dr. Amit Verma</h3>
                  <p className="achievement">NEET Expert, 15+ Years Experience</p>
                  <p className="testimonial">"The key to NEET success is consistent practice and strong fundamentals. I've developed a unique teaching methodology that has helped hundreds of students secure medical seats."</p>
                </div>
              </div>
            </div>
          )}
          
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
              <h2>Download Our Courses</h2>
              <p>Get access to all our courses and features on the go!</p>
              <ul className="app-features">
                <li>✓ Offline video lectures</li>
                <li>✓ Interactive quizzes & tests</li>
                <li>✓ Live doubt solving</li>
                <li>✓ Performance analytics</li>
              </ul>
              <div className="app-buttons">
                <a href="https://play.google.com/store" className="app-button">
                  <img src="https://wonkrew.com/wp-content/uploads/2022/10/Google-Search-Console-logo-Wonkrew-1024x614.png" alt="Get it on Google Play" />
                </a>
                <a href="https://www.apple.com/app-store/" className="app-button">
                  <img src="https://www.eighty3creative.co.uk/wp-content/uploads/2021/02/Google-Analytics-4-Banner.jpg" alt="Download on App Store" />
                </a>
              </div>
            </div>
            <div className="app-image">
              <img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*zzTEyTwyy7jXibtqVWg84Q.gif" alt="App Preview" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
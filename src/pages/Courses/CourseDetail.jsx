import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourseDetail.css';

// Mock data - would be fetched from API in real implementation
const coursesData = {
  'iit-jee': {
    id: 'iit-jee',
    title: 'IIT JEE Preparation',
    image: 'https://img.freepik.com/premium-psd/screen-with-woman-holding-book-blue-background-with-woman-holding-book_1130490-193.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid',
    price: 9999,
    rating: 4.8,
    students: 24564,
    description: 'Comprehensive course for IIT JEE Main & Advanced preparation with expert faculty guidance.',
    longDescription: 'This comprehensive course is designed to help students master the concepts and problem-solving skills needed to crack the IIT JEE examination. Our experienced faculty provides in-depth coverage of all topics in Physics, Chemistry, and Mathematics.',
    instructors: [
      { name: 'Dr. Alakh Pandey', expertise: 'Physics', image: '/images/instructor1.jpg' },
      { name: 'Dr. Pankaj Sijairya', expertise: 'Chemistry', image: '/images/instructor2.jpg' },
    ],
    syllabus: [
      { 
        title: 'Physics', 
        modules: [
          'Mechanics',
          'Electrodynamics',
          'Optics',
          'Modern Physics',
          'Thermodynamics'
        ] 
      },
      { 
        title: 'Chemistry', 
        modules: [
          'Physical Chemistry',
          'Organic Chemistry',
          'Inorganic Chemistry',
          'Coordination Compounds',
          'Biomolecules'
        ] 
      },
      { 
        title: 'Mathematics', 
        modules: [
          'Algebra',
          'Calculus',
          'Coordinate Geometry',
          'Vectors',
          'Probability'
        ] 
      }
    ]
  },
  'neet': {
    id: 'neet',
    title: 'NEET Preparation',
    image: 'https://img.freepik.com/free-psd/e-learning-banner-design-template_23-2149113592.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid',
    price: 8999,
    rating: 4.9,
    students: 28456,
    description: 'Complete NEET preparation with expert guidance and comprehensive study material.',
    longDescription: 'This course is tailored for NEET aspirants, covering all aspects of Biology, Physics, and Chemistry required for the examination. Our expert faculty team provides conceptual clarity through interactive sessions and practice tests.',
    instructors: [
      { name: 'Dr. Amit Mahajan', expertise: 'Biology', image: '/images/instructor3.jpg' },
      { name: 'Dr. Sanjay Sharma', expertise: 'Physics', image: '/images/instructor4.jpg' },
    ],
    syllabus: [
      { 
        title: 'Biology', 
        modules: [
          'Cell Biology',
          'Plant Physiology',
          'Human Physiology',
          'Genetics',
          'Ecology'
        ] 
      },
      { 
        title: 'Physics', 
        modules: [
          'Mechanics',
          'Electrodynamics',
          'Optics',
          'Modern Physics',
          'Thermodynamics'
        ] 
      },
      { 
        title: 'Chemistry', 
        modules: [
          'Physical Chemistry',
          'Organic Chemistry',
          'Inorganic Chemistry',
          'Coordination Compounds',
          'Biomolecules'
        ] 
      }
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // In a real app, you would fetch this data from an API
  const course = coursesData[courseId];

  if (!course) {
    return <div className="course-not-found">Course not found</div>;
  }

  return (
    <div className="course-detail-page">
      {/* Course Hero Section */}
      <div className="course-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${course.image})` }}>
        <div className="container">
          <div className="course-hero-content">
            <h1>{course.title}</h1>
            <div className="course-meta">
              <span className="course-rating">⭐ {course.rating} Rating</span>
              <span className="course-students">👨‍🎓 {course.students.toLocaleString()} Students</span>
            </div>
            <p>{course.description}</p>
            <div className="course-actions">
              <Link to={`/enrollment/${course.id}`} className="btn-enroll">Enroll Now</Link>
              <button className="btn-wishlist">Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="course-content-section">
        <div className="container">
          <div className="course-content-layout">
            <div className="course-main-content">
              {/* Course Tabs */}
              <div className="course-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'syllabus' ? 'active' : ''}`}
                  onClick={() => setActiveTab('syllabus')}
                >
                  Syllabus
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'instructors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('instructors')}
                >
                  Instructors
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <div className="tab-pane">
                    <h2>Course Overview</h2>
                    <p className="course-long-description">{course.longDescription}</p>
                    <h3>What You'll Learn</h3>
                    <ul className="course-features">
                      <li>Master fundamental concepts in all subjects</li>
                      <li>Develop problem-solving techniques</li>
                      <li>Access comprehensive study materials</li>
                      <li>Regular mock tests and assessments</li>
                      <li>Personalized doubt-solving sessions</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'syllabus' && (
                  <div className="tab-pane">
                    <h2>Course Syllabus</h2>
                    <div className="syllabus-sections">
                      {course.syllabus.map((section, index) => (
                        <div className="syllabus-section" key={index}>
                          <h3>{section.title}</h3>
                          <ul>
                            {section.modules.map((module, idx) => (
                              <li key={idx}>{module}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructors' && (
                  <div className="tab-pane">
                    <h2>Meet Your Instructors</h2>
                    <div className="instructors-grid">
                      {course.instructors.map((instructor, index) => (
                        <div className="instructor-card" key={index}>
                          <div className="instructor-image">
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQHU5vMmUZo68g/profile-displayphoto-shrink_200_200/B56ZXaziWDGsAc-/0/1743132700896?e=2147483647&v=beta&t=Q_FVKCtSlvciz_vd84CsnyhuPZZsKGHbiEtwtvh2PcA" alt={instructor.name} />
                          </div>
                          <div className="instructor-info">
                            <h3>{instructor.name}</h3>
                            <p className="instructor-expertise">{instructor.expertise} Expert</p>
                            <p className="instructor-bio">
                              Experienced faculty with expertise in {instructor.expertise} and years of teaching experience.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="tab-pane">
                    <h2>Student Reviews</h2>
                    <div className="reviews-summary">
                      <div className="rating-overview">
                        <div className="average-rating">
                          <span className="rating-number">{course.rating}</span>
                          <div className="rating-stars">⭐⭐⭐⭐⭐</div>
                          <p>Course Rating</p>
                        </div>
                      </div>
                    </div>
                    <div className="review-list">
                      <div className="review-card">
                        <div className="reviewer-info">
                          <img src="https://media.licdn.com/dms/image/v2/D5603AQHU5vMmUZo68g/profile-displayphoto-shrink_200_200/B56ZXaziWDGsAc-/0/1743132700896?e=2147483647&v=beta&t=Q_FVKCtSlvciz_vd84CsnyhuPZZsKGHbiEtwtvh2PcA" alt="Student" />
                          <div>
                            <h4>Rahul Kumar</h4>
                            <div className="review-rating">⭐⭐⭐⭐⭐</div>
                          </div>
                        </div>
                        <p className="review-text">
                          "This course helped me crack IIT JEE with a top rank. The faculty is excellent and the study material is comprehensive."
                        </p>
                      </div>
                      <div className="review-card">
                        <div className="reviewer-info">
                          <img src="https://media.licdn.com/dms/image/v2/D5603AQEvWWVOHRoaNA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1711897708289?e=2147483647&v=beta&t=gWHdmw0YsRu8-e7wasdGYNjmcScPBxRGUyfdVRCYORI" alt="Student" />
                          <div>
                            <h4>Priya Sharma</h4>
                            <div className="review-rating">⭐⭐⭐⭐⭐</div>
                          </div>
                        </div>
                        <p className="review-text">
                          "The doubt-solving sessions and mock tests were game-changers for my preparation. Highly recommended!"
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course Sidebar */}
            <div className="course-sidebar">
              <div className="course-price-card">
                <div className="price-header">
                  <h2>₹{course.price.toLocaleString()}</h2>
                </div>
                <div className="price-features">
                  <ul>
                    <li>✅ Full course access</li>
                    <li>✅ Live doubt solving sessions</li>
                    <li>✅ Study materials & notes</li>
                    <li>✅ Mock tests & assessments</li>
                    <li>✅ Mobile app access</li>
                    <li>✅ Course completion certificate</li>
                  </ul>
                </div>
                <Link to={`/enrollment/${course.id}`} className="btn-enroll-sidebar">
                  Enroll Now
                </Link>
                <p className="money-back">30-Day Money Back Guarantee</p>
              </div>

              <div className="share-course">
                <h3>Share This Course</h3>
                <div className="share-buttons">
                  <button className="share-btn facebook">Facebook</button>
                  <button className="share-btn twitter">Twitter</button>
                  <button className="share-btn whatsapp">WhatsApp</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 
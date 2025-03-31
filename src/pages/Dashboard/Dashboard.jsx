import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Mock data - would be fetched from API in real implementation
const userData = {
  name: 'Sudhanshu Singh',
  email: 'singh@example.com',
  profileImage: 'https://lh3.googleusercontent.com/a/ACg8ocLT1rlCqhwSRZv5rEKisrjQ-5n2Bav03yS4uJ3pNnv_U0CpwKXHgw=s192-c-mo',
  enrolledCourses: [
    {
      id: 'iit-jee',
      title: 'IIT JEE Preparation',
      image: 'https://img.freepik.com/free-psd/studying-home-banner-template_23-2148970851.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid',
      progress: 65,
      nextLesson: 'Thermodynamics: Laws of Thermodynamics',
      lastAccessed: '2023-09-15T10:30:00',
      instructors: ['Dr. Alakh Pandey', 'Dr. Pankaj Sijairya'],
      upcomingLiveClass: {
        title: 'Problem Solving: Thermodynamics',
        date: '2023-09-17T09:00:00',
        duration: 90,
        tutor: 'Dr. Alakh Pandey'
      }
    },
    {
      id: 'neet',
      title: 'NEET Preparation',
      image: 'https://img.freepik.com/free-psd/e-learning-horizontal-banner-template-with-geometric-shapes_23-2149433273.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid',
      progress: 42,
      nextLesson: 'Human Physiology: Respiratory System',
      lastAccessed: '2023-09-14T15:45:00',
      instructors: ['Dr. Amit Mahajan', 'Dr. Sanjay Sharma'],
      upcomingLiveClass: {
        title: 'Special Session: NEET Biology Important Topics',
        date: '2023-09-18T10:00:00',
        duration: 120,
        tutor: 'Dr. Amit Mahajan'
      }
    }
  ],
  recentActivities: [
    {
      type: 'completed_lesson',
      courseId: 'iit-jee',
      courseName: 'IIT JEE Preparation',
      title: 'Mechanics: Laws of Motion',
      timestamp: '2023-09-15T09:45:00'
    },
    {
      type: 'completed_quiz',
      courseId: 'iit-jee',
      courseName: 'IIT JEE Preparation',
      title: 'Mechanics Quiz',
      score: 85,
      timestamp: '2023-09-15T10:15:00'
    },
    {
      type: 'watched_lecture',
      courseId: 'neet',
      courseName: 'NEET Preparation',
      title: 'Cell: Structure and Functions',
      timestamp: '2023-09-14T15:30:00'
    },
    {
      type: 'downloaded_notes',
      courseId: 'neet',
      courseName: 'NEET Preparation',
      title: 'Biology Notes: Cell Biology',
      timestamp: '2023-09-14T15:45:00'
    }
  ],
  upcomingTests: [
    {
      id: 'test-1',
      title: 'JEE Mock Test: Physics Full Syllabus',
      courseId: 'iit-jee',
      date: '2023-09-20T10:00:00',
      duration: 180
    },
    {
      id: 'test-2',
      title: 'NEET Weekly Test: Biology',
      courseId: 'neet',
      date: '2023-09-18T14:00:00',
      duration: 60
    }
  ],
  recommendations: [
    {
      id: 'upsc',
      title: 'UPSC CSE Preparation',
      image: 'https://img.freepik.com/premium-psd/online-learning-facebook-banner-cover_220346-1571.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid',
      rating: 4.9,
      students: 12500,
      price: 14999,
      discountedPrice: 11999
    },
    {
      id: 'gate',
      title: 'GATE CSE Preparation',
      image: 'https://img.freepik.com/free-psd/e-learning-banner-design-template_23-2149113591.jpg?uid=R123767660&ga=GA1.1.422920070.1741165168&semt=ais_hybrid',
      rating: 4.8,
      students: 8750,
      price: 8999,
      discountedPrice: 6999
    }
  ]
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to format time
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  // Function to calculate remaining days
  const getRemainingDays = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar">
              <img src={userData.profileImage} alt={userData.name} />
            </div>
            <div className="user-info">
              <h1>Welcome back, {userData.name.split(' ')[0]}!</h1>
              <p>Continue your learning journey</p>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to="/profile" className="btn-profile">My Profile</Link>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            My Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Recent Activities
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            Upcoming Tests
          </button>
          <button 
            className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommended
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'courses' && (
            <div className="enrolled-courses">
              {userData.enrolledCourses.map((course, index) => (
                <div className="enrolled-course" key={index}>
                  <div className="course-overview">
                    <img src={course.image} alt={course.title} className="course-image" />
                    <div className="course-details">
                      <h3>{course.title}</h3>
                      <div className="course-meta">
                        <div className="instructors">
                          <span>Instructors:</span> {course.instructors.join(', ')}
                        </div>
                        <div className="last-accessed">
                          <span>Last accessed:</span> {formatDate(course.lastAccessed)}
                        </div>
                      </div>
                      <div className="progress-container">
                        <div className="progress-text">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="course-actions">
                        <Link to={`/courses/${course.id}`} className="btn-continue">
                          Continue Learning
                        </Link>
                        <Link to={`/study-materials/${course.id}`} className="btn-materials">
                          Study Materials
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="course-details-expanded">
                    <div className="next-lesson">
                      <h4>Next Lesson</h4>
                      <p>{course.nextLesson}</p>
                      <Link to={`/courses/${course.id}`} className="btn-start-lesson">
                        Start Lesson
                      </Link>
                    </div>
                    {course.upcomingLiveClass && (
                      <div className="upcoming-live-class">
                        <h4>Upcoming Live Class</h4>
                        <div className="live-class-details">
                          <p className="class-title">{course.upcomingLiveClass.title}</p>
                          <p className="class-time">
                            {formatDate(course.upcomingLiveClass.date)} at {formatTime(course.upcomingLiveClass.date)}
                          </p>
                          <p className="class-tutor">
                            Tutor: {course.upcomingLiveClass.tutor}
                          </p>
                          <p className="class-duration">
                            Duration: {course.upcomingLiveClass.duration} minutes
                          </p>
                          <div className="countdown">
                            {getRemainingDays(course.upcomingLiveClass.date)}
                          </div>
                          <button className="btn-join-class">
                            Set Reminder
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="recent-activities">
              <h2>Your Recent Activities</h2>
              <div className="activity-list">
                {userData.recentActivities.map((activity, index) => (
                  <div className="activity-item" key={index}>
                    <div className="activity-icon">
                      {activity.type === 'completed_lesson' && '📚'}
                      {activity.type === 'completed_quiz' && '✅'}
                      {activity.type === 'watched_lecture' && '🎬'}
                      {activity.type === 'downloaded_notes' && '📝'}
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">
                        {activity.type === 'completed_lesson' && 'Completed Lesson:'}
                        {activity.type === 'completed_quiz' && 'Completed Quiz:'}
                        {activity.type === 'watched_lecture' && 'Watched Lecture:'}
                        {activity.type === 'downloaded_notes' && 'Downloaded Notes:'}
                        {' '}{activity.title}
                      </p>
                      <p className="activity-course">{activity.courseName}</p>
                      {activity.type === 'completed_quiz' && (
                        <p className="activity-score">Score: {activity.score}%</p>
                      )}
                      <p className="activity-time">
                        {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                      </p>
                    </div>
                    <div className="activity-actions">
                      <Link to={`/courses/${activity.courseId}`} className="btn-activity">
                        Go to Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="upcoming-tests">
              <h2>Upcoming Tests & Assessments</h2>
              <div className="tests-list">
                {userData.upcomingTests.map((test, index) => (
                  <div className="test-item" key={index}>
                    <div className="test-info">
                      <h3>{test.title}</h3>
                      <div className="test-details">
                        <p className="test-time">
                          <span>Date & Time:</span> {formatDate(test.date)} at {formatTime(test.date)}
                        </p>
                        <p className="test-duration">
                          <span>Duration:</span> {test.duration} minutes
                        </p>
                        <div className="test-countdown">
                          {getRemainingDays(test.date)}
                        </div>
                      </div>
                    </div>
                    <div className="test-actions">
                      <Link to={`/courses/${test.courseId}`} className="btn-take-test">
                        Prepare for Test
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="course-recommendations">
              <h2>Recommended Courses for You</h2>
              <div className="recommended-courses">
                {userData.recommendations.map((course, index) => (
                  <div className="recommended-course" key={index}>
                    <img src={course.image} alt={course.title} className="course-image" />
                    <div className="course-content">
                      <h3>{course.title}</h3>
                      <div className="course-meta">
                        <span className="rating">⭐ {course.rating}</span>
                        <span className="students">{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="course-price">
                        <span className="price">₹{course.discountedPrice.toLocaleString()}</span>
                        <span className="original-price">₹{course.price.toLocaleString()}</span>
                      </div>
                      <Link to={`/courses/${course.id}`} className="btn-view-course">
                        View Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
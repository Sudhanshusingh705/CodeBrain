import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CourseDetail from './pages/Courses/CourseDetail';
import Enrollment from './pages/Enrollment/Enrollment';
import Dashboard from './pages/Dashboard/Dashboard';
import LiveClass from './pages/LiveClass/LiveClass';
import StudyMaterials from './pages/StudyMaterials/StudyMaterials';
import Forum from './pages/Forum/Forum';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Courses */}
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/course/:courseId" element={<CourseDetail />} /> {/* Maintain backward compatibility */}
            
            {/* Student Features */}
            <Route path="/enrollment/:courseId" element={<Enrollment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-class/:classId" element={<LiveClass />} />
            <Route path="/study-materials/:courseId" element={<StudyMaterials />} />
            
            {/* Discussion Forum */}
            <Route path="/forum/:courseId" element={<Forum />} />
            <Route path="/forum/:courseId/discussion/:discussionId" element={<Forum />} />
            
            {/* User Pages */}
            <Route path="/profile" element={<div className="container page-header"><h1>Profile Page</h1><p>This page is under construction</p></div>} />
            <Route path="/my-courses" element={<div className="container page-header"><h1>My Courses</h1><p>This page is under construction</p></div>} />
            
            {/* Miscellaneous Pages */}
            <Route path="/competitive-exams" element={<div className="container page-header"><h1>Competitive Exams</h1><p>This page is under construction</p></div>} />
            <Route path="/school-prep" element={<div className="container page-header"><h1>School Prep</h1><p>This page is under construction</p></div>} />
            <Route path="/govt-exam" element={<div className="container page-header"><h1>Government Exams</h1><p>This page is under construction</p></div>} />
            <Route path="/study-abroad" element={<div className="container page-header"><h1>Study Abroad</h1><p>This page is under construction</p></div>} />
            
            {/* 404 Not Found */}
            <Route path="*" element={<div className="container page-header"><h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 
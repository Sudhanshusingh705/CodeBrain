import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StudyMaterials.css';

const StudyMaterials = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [activeTab, setActiveTab] = useState('readings');
  const [loading, setLoading] = useState(true);

  // Simulated materials data - in a real app, fetch from API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockMaterials = {
        readings: [
          { id: 1, title: 'Introduction to the Course', type: 'pdf', size: '2.4 MB', dateAdded: '2023-06-15' },
          { id: 2, title: 'Chapter 1: Core Concepts', type: 'pdf', size: '3.7 MB', dateAdded: '2023-06-18' },
          { id: 3, title: 'Research Paper: Modern Applications', type: 'pdf', size: '1.2 MB', dateAdded: '2023-06-22' },
        ],
        videos: [
          { id: 1, title: 'Lecture 1: Getting Started', duration: '45:12', dateAdded: '2023-06-15' },
          { id: 2, title: 'Demo: Practical Implementation', duration: '32:48', dateAdded: '2023-06-19' },
          { id: 3, title: 'Industry Expert Interview', duration: '28:05', dateAdded: '2023-06-24' },
        ],
        exercises: [
          { id: 1, title: 'Practice Quiz 1', questions: 15, deadline: '2023-07-10' },
          { id: 2, title: 'Assignment: Case Study', type: 'document', deadline: '2023-07-15' },
          { id: 3, title: 'Group Project Guidelines', type: 'document', deadline: '2023-07-30' },
        ],
        resources: [
          { id: 1, title: 'Additional Reading List', type: 'doc', size: '0.5 MB' },
          { id: 2, title: 'Useful Tools and Software', type: 'link', url: 'https://example.com/tools' },
          { id: 3, title: 'Glossary of Terms', type: 'pdf', size: '1.0 MB' },
        ]
      };
      
      setMaterials(mockMaterials);
      setLoading(false);
    }, 1000);
  }, [courseId]);

  // Handle material download or view
  const handleMaterialAccess = (material) => {
    // In a real app, this would either download the file or open it in a viewer
    console.log(`Accessing material: ${material.title}`);
    // For demonstration purposes, alert the user
    alert(`Accessing: ${material.title}`);
  };

  // Render materials based on active tab
  const renderMaterials = () => {
    if (loading) {
      return <div className="loading-spinner">Loading materials...</div>;
    }

    if (!materials[activeTab] || materials[activeTab].length === 0) {
      return <div className="no-materials">No materials available in this section.</div>;
    }

    return (
      <div className="materials-list">
        {materials[activeTab].map(material => (
          <div key={material.id} className="material-item" onClick={() => handleMaterialAccess(material)}>
            <div className="material-icon">
              {activeTab === 'readings' && <i className="fas fa-file-pdf"></i>}
              {activeTab === 'videos' && <i className="fas fa-video"></i>}
              {activeTab === 'exercises' && <i className="fas fa-tasks"></i>}
              {activeTab === 'resources' && <i className="fas fa-link"></i>}
            </div>
            <div className="material-details">
              <h3>{material.title}</h3>
              <div className="material-meta">
                {activeTab === 'readings' && (
                  <>
                    <span>{material.type.toUpperCase()}</span>
                    <span>{material.size}</span>
                    <span>Added: {material.dateAdded}</span>
                  </>
                )}
                {activeTab === 'videos' && (
                  <>
                    <span>Duration: {material.duration}</span>
                    <span>Added: {material.dateAdded}</span>
                  </>
                )}
                {activeTab === 'exercises' && (
                  <>
                    {material.questions && <span>{material.questions} questions</span>}
                    {material.type && <span>{material.type}</span>}
                    <span>Due: {material.deadline}</span>
                  </>
                )}
                {activeTab === 'resources' && (
                  <>
                    {material.type && <span>{material.type.toUpperCase()}</span>}
                    {material.size && <span>{material.size}</span>}
                    {material.url && <span className="resource-url">External Link</span>}
                  </>
                )}
              </div>
            </div>
            <div className="material-action">
              <button className="btn-access">
                {activeTab === 'readings' || activeTab === 'resources' ? 'Download' : 
                 activeTab === 'videos' ? 'Watch' : 'Open'}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="study-materials-page">
      <div className="container">
        <div className="page-header">
          <h1>Study Materials</h1>
          <p>Access all course resources in one place</p>
        </div>

        <div className="materials-navigation">
          <div className="search-bar">
            <input type="text" placeholder="Search materials..." />
            <button className="search-btn"><i className="fas fa-search"></i></button>
          </div>
          
          <div className="materials-tabs">
            <button 
              className={`tab-btn ${activeTab === 'readings' ? 'active' : ''}`}
              onClick={() => setActiveTab('readings')}
            >
              Readings
            </button>
            <button 
              className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
            <button 
              className={`tab-btn ${activeTab === 'exercises' ? 'active' : ''}`}
              onClick={() => setActiveTab('exercises')}
            >
              Exercises
            </button>
            <button 
              className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>
        </div>

        <div className="materials-content">
          <div className="materials-section">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            {renderMaterials()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials; 
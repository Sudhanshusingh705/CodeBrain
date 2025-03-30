import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './LiveClass.css';

// Mock data for the live class
const liveClassData = {
  'thermo-class': {
    id: 'thermo-class',
    title: 'Problem Solving: Thermodynamics',
    instructor: 'Dr. Alakh Pandey',
    instructorImage: '/images/instructor1.jpg',
    course: 'IIT JEE Preparation',
    courseId: 'iit-jee',
    duration: 90, // minutes
    description: 'In this live class, we will solve complex problems related to Thermodynamics, focusing on Laws of Thermodynamics and their applications in various scenarios.',
    attendees: 1250,
    startTime: '2023-09-17T09:00:00',
    resources: [
      { type: 'pdf', title: 'Thermodynamics Problem Set', url: '#' },
      { type: 'pdf', title: 'Laws of Thermodynamics Notes', url: '#' }
    ],
    chatMessages: [
      { id: 1, user: 'Rahul Kumar', message: 'Looking forward to learning about thermodynamics!', time: '08:55 AM' },
      { id: 2, user: 'Priya Sharma', message: 'Is this class covering Carnot Cycle?', time: '08:57 AM' },
      { id: 3, user: 'Dr. Alakh Pandey', message: 'Yes, we will cover Carnot Cycle and its applications. Make sure you have the problem set downloaded.', time: '08:58 AM', isInstructor: true },
      { id: 4, user: 'Amit Singh', message: 'Will the recording be available later?', time: '09:01 AM' },
      { id: 5, user: 'Dr. Alakh Pandey', message: 'Yes, the recording will be available in your dashboard within 24 hours after the class.', time: '09:02 AM', isInstructor: true }
    ]
  }
};

const LiveClass = () => {
  const { classId } = useParams();
  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [activePoll, setActivePoll] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [isRaiseHand, setIsRaiseHand] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);

  // Get live class data from mock data
  const liveClass = liveClassData[classId];

  // Handle video controls visibility
  useEffect(() => {
    const hideControls = () => {
      if (isControlsVisible) {
        const timer = setTimeout(() => {
          setIsControlsVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };
    hideControls();
  }, [isControlsVisible]);

  // Handle chat scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [localMessages, activeTab]);

  // Simulate a poll after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setActivePoll({
        question: 'Which law of thermodynamics is known as the law of conservation of energy?',
        options: [
          { id: 'a', text: 'Zeroth Law' },
          { id: 'b', text: 'First Law' },
          { id: 'c', text: 'Second Law' },
          { id: 'd', text: 'Third Law' }
        ],
        correctAnswer: 'b',
        timeRemaining: 60
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Handle full screen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
    setIsMuted(newVolume === 0);
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // Handle chat message submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setLocalMessages(prevMessages => [...prevMessages, newMessage]);
      setChatMessage('');
    }
  };

  // Handle raise hand toggle
  const toggleRaiseHand = () => {
    setIsRaiseHand(!isRaiseHand);
    // Simulate instructor acknowledgment
    if (!isRaiseHand) {
      setTimeout(() => {
        const instructorResponse = {
          id: Date.now(),
          user: liveClass.instructor,
          message: "I'll address your query shortly.",
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isInstructor: true
        };
        setLocalMessages(prevMessages => [...prevMessages, instructorResponse]);
      }, 5000);
    }
  };

  // Handle poll submission
  const handlePollSubmit = (optionId) => {
    // Simulate poll submission
    setTimeout(() => {
      setActivePoll(prev => ({
        ...prev,
        userAnswer: optionId,
        resultsVisible: true,
        results: {
          'a': 15,
          'b': 68,
          'c': 12,
          'd': 5
        }
      }));
    }, 1000);

    // Clear poll after showing results
    setTimeout(() => {
      setActivePoll(null);
    }, 8000);
  };

  // If class not found
  if (!liveClass) {
    return <div className="live-class-not-found">Live class not found</div>;
  }

  return (
    <div className="live-class-page">
      <div className="live-class-container">
        <div className="video-container" 
          onMouseMove={() => setIsControlsVisible(true)}
        >
          <video
            ref={videoRef}
            className="live-video"
            autoPlay
            poster="/images/video-poster.jpg"
          >
            {/* In a real implementation, this would be a live stream source */}
            <source src="/videos/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls */}
          <div className={`video-controls ${isControlsVisible ? 'visible' : ''}`}>
            <div className="control-bar">
              <button className="control-btn play-btn">
                <span className="play-icon">▶</span>
              </button>
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '25%' }}></div>
                </div>
                <div className="time-display">22:30 / 90:00</div>
              </div>
              <div className="volume-control">
                <button className="control-btn volume-btn" onClick={toggleMute}>
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
              <button className="control-btn fullscreen-btn" onClick={toggleFullScreen}>
                {isFullScreen ? '⊖' : '⊕'}
              </button>
            </div>
          </div>

          {/* Active Poll Overlay */}
          {activePoll && (
            <div className="poll-overlay">
              <div className="poll-container">
                <h3>Quick Poll</h3>
                <p className="poll-question">{activePoll.question}</p>
                <div className="poll-options">
                  {activePoll.options.map(option => (
                    <div key={option.id} className="poll-option">
                      {activePoll.resultsVisible ? (
                        <div className={`poll-result ${activePoll.correctAnswer === option.id ? 'correct' : ''} ${activePoll.userAnswer === option.id ? 'selected' : ''}`}>
                          <span className="option-text">{option.id}. {option.text}</span>
                          <div className="result-bar-container">
                            <div 
                              className="result-bar" 
                              style={{ width: `${activePoll.results[option.id]}%` }}
                            ></div>
                            <span className="result-percentage">{activePoll.results[option.id]}%</span>
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="poll-option-btn"
                          onClick={() => handlePollSubmit(option.id)}
                        >
                          {option.id}. {option.text}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {!activePoll.resultsVisible && (
                  <div className="poll-timer">
                    Time remaining: {activePoll.timeRemaining} seconds
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="live-class-info">
          <div className="class-header">
            <div className="class-title-container">
              <h1>{liveClass.title}</h1>
              <div className="class-meta">
                <span className="class-course">{liveClass.course}</span>
                <span className="attendees-count">👥 {liveClass.attendees} attendees</span>
              </div>
            </div>
            <div className="instructor-info">
              <img 
                src={liveClass.instructorImage} 
                alt={liveClass.instructor} 
                className="instructor-image" 
              />
              <div className="instructor-details">
                <span className="instructor-name">{liveClass.instructor}</span>
                <span className="live-indicator">🔴 LIVE</span>
              </div>
            </div>
          </div>

          <div className="interaction-panel">
            <div className="panel-tabs">
              <button 
                className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
              >
                💬 Chat
              </button>
              <button 
                className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                📝 Notes
              </button>
              <button 
                className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                📚 Resources
              </button>
              <button 
                className={`tab-btn ${isRaiseHand ? 'active' : ''}`}
                onClick={toggleRaiseHand}
              >
                ✋ {isRaiseHand ? 'Hand Raised' : 'Raise Hand'}
              </button>
            </div>

            <div className="panel-content">
              {activeTab === 'chat' && (
                <div className="chat-panel">
                  <div className="chat-messages" ref={chatContainerRef}>
                    {[...liveClass.chatMessages, ...localMessages].map(message => (
                      <div 
                        key={message.id} 
                        className={`chat-message ${message.isInstructor ? 'instructor-message' : ''}`}
                      >
                        <div className="message-header">
                          <span className="message-sender">{message.user}</span>
                          <span className="message-time">{message.time}</span>
                        </div>
                        <p className="message-text">{message.message}</p>
                      </div>
                    ))}
                  </div>
                  <form className="chat-input-form" onSubmit={handleChatSubmit}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="chat-input"
                    />
                    <button type="submit" className="send-btn">Send</button>
                  </form>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="notes-panel">
                  <textarea 
                    className="notes-input" 
                    placeholder="Take notes during the class..."
                  ></textarea>
                  <div className="notes-actions">
                    <button className="notes-btn save-notes">Save Notes</button>
                    <button className="notes-btn download-notes">Download</button>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="resources-panel">
                  <h3>Class Resources</h3>
                  <div className="resources-list">
                    {liveClass.resources.map((resource, index) => (
                      <div className="resource-item" key={index}>
                        <div className="resource-icon">
                          {resource.type === 'pdf' && '📄'}
                          {resource.type === 'video' && '🎬'}
                          {resource.type === 'link' && '🔗'}
                        </div>
                        <div className="resource-details">
                          <p className="resource-title">{resource.title}</p>
                          <a href={resource.url} className="resource-download">
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="additional-resources">
                    <h3>Additional Resources</h3>
                    <p>More resources will be added during the session.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass; 
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Forum.css';

const Forum = () => {
  const { courseId } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockDiscussions = [
        {
          id: 1,
          title: 'How to approach the final project?',
          author: 'John Smith',
          authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          category: 'general',
          created: '2023-06-20T14:22:00',
          content: "I'm struggling with the final project requirements. Can someone help me understand the expectations better?",
          replies: 8,
          likes: 12,
          isLiked: false,
          isFollowing: true,
        },
        {
          id: 2,
          title: 'Resource recommendation for Chapter 3',
          author: 'Emily Johnson',
          authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          category: 'resource',
          created: '2023-06-19T09:45:00',
          content: "I found this amazing article that really helped me understand the concepts in Chapter 3. Sharing it here for everyone!",
          replies: 3,
          likes: 7,
          isLiked: true,
          isFollowing: false,
        },
        {
          id: 3,
          title: 'Technical issue with the course lab',
          author: 'Michael Wong',
          authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          category: 'technical',
          created: '2023-06-18T16:30:00',
          content: "I'm getting an error when trying to run the lab for Week 4. Has anyone else experienced this?",
          replies: 12,
          likes: 3,
          isLiked: false,
          isFollowing: false,
        },
        {
          id: 4,
          title: "Weekly study group - who's interested?",
          author: 'Sarah Davis',
          authorAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
          category: 'collaboration',
          created: '2023-06-17T11:15:00',
          content: "I'm thinking of starting a weekly study group for this course. We could meet online every Wednesday at 7 PM. Anyone interested?",
          replies: 15,
          likes: 24,
          isLiked: true,
          isFollowing: true,
        },
        {
          id: 5,
          title: 'Question about Assignment 2',
          author: 'Alex Turner',
          authorAvatar: 'https://randomuser.me/api/portraits/men/51.jpg',
          category: 'question',
          created: '2023-06-16T14:50:00',
          content: "For Assignment 2, are we supposed to include references to external resources? The instructions weren't clear about this.",
          replies: 6,
          likes: 8,
          isLiked: false,
          isFollowing: false,
        }
      ];
      
      setDiscussions(mockDiscussions);
      setLoading(false);
    }, 1000);
  }, [courseId]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    if (!newPost.trim()) return;
    
    // In a real app, this would be an API call to save the post
    const newDiscussion = {
      id: discussions.length + 1,
      title: newPost,
      author: 'Current User',
      authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      category: 'general',
      created: new Date().toISOString(),
      content: `${newPost} - This is a new discussion topic.`,
      replies: 0,
      likes: 0,
      isLiked: false,
      isFollowing: true,
    };
    
    setDiscussions([newDiscussion, ...discussions]);
    setNewPost('');
    
    // Show success message (in a real app)
    alert('Discussion posted successfully!');
  };

  const toggleLike = (id) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === id) {
        return {
          ...discussion,
          likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
          isLiked: !discussion.isLiked
        };
      }
      return discussion;
    }));
  };

  const toggleFollow = (id) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === id) {
        return {
          ...discussion,
          isFollowing: !discussion.isFollowing
        };
      }
      return discussion;
    }));
  };

  // Filter discussions based on active category and search term
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = activeCategory === 'all' || discussion.category === activeCategory;
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="forum-page">
      <div className="container">
        <div className="page-header">
          <h1>Discussion Forum</h1>
          <p>Connect with fellow students and instructors</p>
        </div>

        <div className="forum-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search discussions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="new-discussion">
            <form onSubmit={handlePostSubmit}>
              <input 
                type="text" 
                placeholder="Start a new discussion..." 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <button type="submit" className="btn-post">Post</button>
            </form>
          </div>
        </div>

        <div className="forum-categories">
          <button 
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Topics
          </button>
          <button 
            className={`category-btn ${activeCategory === 'general' ? 'active' : ''}`}
            onClick={() => setActiveCategory('general')}
          >
            General
          </button>
          <button 
            className={`category-btn ${activeCategory === 'question' ? 'active' : ''}`}
            onClick={() => setActiveCategory('question')}
          >
            Questions
          </button>
          <button 
            className={`category-btn ${activeCategory === 'resource' ? 'active' : ''}`}
            onClick={() => setActiveCategory('resource')}
          >
            Resources
          </button>
          <button 
            className={`category-btn ${activeCategory === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveCategory('technical')}
          >
            Technical
          </button>
          <button 
            className={`category-btn ${activeCategory === 'collaboration' ? 'active' : ''}`}
            onClick={() => setActiveCategory('collaboration')}
          >
            Collaboration
          </button>
        </div>

        <div className="discussions-container">
          {loading ? (
            <div className="loading-message">Loading discussions...</div>
          ) : filteredDiscussions.length === 0 ? (
            <div className="no-discussions">
              <p>No discussions found. Start a new one!</p>
            </div>
          ) : (
            filteredDiscussions.map(discussion => (
              <div className="discussion-card" key={discussion.id}>
                <div className="discussion-header">
                  <div className="user-info">
                    <img src={discussion.authorAvatar} alt={discussion.author} className="avatar" />
                    <div className="user-details">
                      <h4>{discussion.author}</h4>
                      <span className="post-date">{formatDate(discussion.created)}</span>
                    </div>
                  </div>
                  <div className="post-category">
                    <span className={`category-tag ${discussion.category}`}>
                      {discussion.category.charAt(0).toUpperCase() + discussion.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="discussion-content">
                  <h3 className="discussion-title">
                    <Link to={`/forum/${courseId}/discussion/${discussion.id}`}>
                      {discussion.title}
                    </Link>
                  </h3>
                  <p className="discussion-text">{discussion.content}</p>
                </div>
                <div className="discussion-footer">
                  <div className="stats">
                    <span className="replies-count">
                      <i className="fas fa-comment"></i> {discussion.replies} replies
                    </span>
                    <button 
                      className={`like-btn ${discussion.isLiked ? 'liked' : ''}`} 
                      onClick={() => toggleLike(discussion.id)}
                    >
                      <i className="fas fa-thumbs-up"></i> {discussion.likes}
                    </button>
                  </div>
                  <div className="actions">
                    <button 
                      className={`follow-btn ${discussion.isFollowing ? 'following' : ''}`}
                      onClick={() => toggleFollow(discussion.id)}
                    >
                      {discussion.isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <Link to={`/forum/${courseId}/discussion/${discussion.id}`} className="reply-btn">
                      Reply
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pagination">
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Forum; 
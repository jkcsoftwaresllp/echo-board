import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      _id: '1',
      name: 'Piyush Kumar',
      createdAt: new Date(),
      message:
        'Great Feedback System — Easy & Insightful! The platform is user-friendly and makes collecting and managing reviews super easy. The analytics dashboard is especially helpful for tracking user sentiment and improving our services. Moderation tools work well, though more design customization would be a nice addition. Overall, a reliable and efficient review system!',
      ratings: {
        design: 4.5,
        features: 3.5,
        performance: 4.0,
        overall: 4.8,
      },
      hidden: false,
    },
    {
      _id: '2',
      name: 'John Doe',
      createdAt: new Date(),
      message: 'Simple, elegant, and powerful system!',
      ratings: {
        design: 5,
        features: 4.5,
        performance: 4.7,
        overall: 4.9,
      },
      hidden: false,
    },
  ]);

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((f) => f._id !== id));
  };

  const handleHide = (id) => {
    setFeedbacks(
      feedbacks.map((f) =>
        f._id === id ? { ...f, hidden: !f.hidden } : f
      )
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-title-box">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>

      {feedbacks.map((fb) => (
        <div key={fb._id} className={`feedback-card ${fb.hidden ? 'hidden' : ''}`}>
          <div className="feedback-header">
            <div>
              <h3>{fb.name}</h3>
              <p className="feedback-date">
                {new Date(fb.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="overall-rating">
              ⭐ {fb.ratings?.overall || 0} / 5
            </div>
          </div>

          <div className="ratings-summary">
            <p>Design: {fb.ratings?.design}</p>
            <p>Features: {fb.ratings?.features}</p>
            <p>Performance: {fb.ratings?.performance}</p>
          </div>

          <p className="feedback-message">{fb.message}</p>

          <div className="dashboard-buttons">
            <button className="hide-btn" onClick={() => handleHide(fb._id)}>
              {fb.hidden ? 'UNHIDE' : 'HIDE'}
            </button>
            <button className="delete-btn" onClick={() => handleDelete(fb._id)}>
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
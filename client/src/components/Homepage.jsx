import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>

      <div className="echoboard-container">
        {/* <header className="header">
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon"></div>
          </div>
          <h1 className="brand-name">EchoBoard</h1>
        </div>
        <nav className="navigation">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About us</a>
          <a href="#admin" className="nav-link">Admin Login</a>
        </nav>
      </header> */}

        <main className="main-content">
          <div className="content-section">
            <h1 className="main-title">
              Welcome<br />
              to EchoBoard
            </h1>
            <p className="subtitle">Collect, Manage, and Improve with Feedback</p>
            <button className="cta-button" onClick={() => navigate('/feedback')}>
              Give Feedback
              <span className="button-arrow">→</span>
            </button>
          </div>

          <div className="dashboard-preview">
            <div className="laptop-frame">
              <div className="laptop-screen">
                <div className="browser-bar">
                  <div className="browser-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>

                <div className="dashboard-content">
                  <div className="sidebar">
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                  </div>

                  <div className="main-dashboard">
                    <div className="dashboard-header">
                      <div className="header-line long"></div>
                      <div className="header-line short"></div>
                    </div>

                    <div className="content-grid">
                      <div className="content-card">
                        <div className="card-line"></div>
                        <div className="card-line short"></div>
                        <div className="card-line"></div>
                      </div>

                      <div className="rating-card">
                        <div className="stars">
                          <span className="star">★</span>
                          <span className="star">★</span>
                          <span className="star">★</span>
                          <span className="star">★</span>
                          <span className="star">★</span>
                        </div>
                        <div className="rating-line"></div>
                        <div className="rating-line short"></div>
                      </div>

                      <div className="list-section">
                        <div className="list-item">
                          <div className="list-dot"></div>
                          <div className="list-text"></div>
                        </div>
                        <div className="list-item">
                          <div className="list-dot"></div>
                          <div className="list-text"></div>
                        </div>
                      </div>

                      <div className="chart-section">
                        <div className="chart-bars">
                          <div className="bar bar-1"></div>
                          <div className="bar bar-2"></div>
                          <div className="bar bar-3"></div>
                          <div className="bar bar-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Homepage;


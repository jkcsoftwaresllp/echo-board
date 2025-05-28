
import "./UserDashboard.css";
// import logo from "../assets/images/logo.jpeg";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.jpeg";
import loginImage from "../assets/images/adminLogin2.png";
import messageIcon from "../assets/icons/envelope.svg";
import lockIcon from "../assets/icons/lock.svg";


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";



export default function UserDashboard() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [label, setLabel] = useState("Very Good");
  const [scores, setScores] = useState({
    design: 0,
    features: 0,
    performance: 0,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/feedbacks?page=${page}&limit=5`,
          { timeout: 6000 }
        );

        if (response.data.status) {
          setFeedbackData((prev) => [...prev, ...response.data.feedbacks]);

          if (page === 1) {
            setAverageRating(response.data.averageRating || 0);
            setTotalRatings(response.data.totalRatings || 0);
            setLabel(response.data.label || "Very Good");
            setScores(response.data.scores || {
              design: 0,
              features: 0,
              performance: 0,
            });
          }

          setHasMore(response.data.hasMore);
        } else {
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        console.error("API Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) fetchFeedback();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  const handleFeedbackClick = () => {
    window.location.href = "/submit-feedback";
  };

  return (
    <div className="app">
      {/* Summary Section */}
      <section className="summary-card">
        <div className="product-info">
          <img src={logo3} alt="EchoBoard Logo" className="product-logo" />
        </div>
        <div className="score-rating">
          <div>
            <p className="label">Score</p>
            <p className="value">7.5/10</p>
          </div>
          <div>
            <p className="label">Ratings</p>
            <p className="value">⭐ {averageRating}/5</p>
          </div>
        </div>
        <button className="feedback-button" onClick={handleFeedbackClick}>
          Give your Feedback
        </button>
      </section>

      {/* Sub Nav */}
      <div className="sub-nav">
        <a href="#about">About Product</a>
        <a href="#reviews">Reviews</a>
        <a href="#feedback">User's Feedback</a>
      </div>

      {/* Reviews Section */}
      <section className="user-reviews">
        <h3>User Reviews</h3>

        {/* Average Rating Summary */}
        <div className="rating-summary">
          <span className="badge">{label}</span>
          <div className="average-rating">
            <h2>{averageRating}</h2>
            <p>out of 5</p>
            <p>⭐ {totalRatings} Ratings</p>
          </div>
        </div>

        {/* Score Bars */}
        <div className="metrics">
          <div className="metric">
            <p>Design</p>
            <div className="bar">
              <div className="fill" style={{ width: `${(scores.design / 5) * 100}%` }}></div>
            </div>
            <span>{scores.design}</span>
          </div>
          <div className="metric">
            <p>Features</p>
            <div className="bar">
              <div className="fill" style={{ width: `${(scores.features / 5) * 100}%` }}></div>
            </div>
            <span>{scores.features}</span>
          </div>
          <div className="metric">
            <p>Performance</p>
            <div className="bar">
              <div className="fill" style={{ width: `${(scores.performance / 5) * 100}%` }}></div>
            </div>
            <span>{scores.performance}</span>
          </div>
        </div>

        {/* Feedback Cards */}
        {feedbackData.map((review, index) => (
          <div className="review-box" key={index}>
            <div className="review-header">
              <p>{review.name}</p>
              <p>{new Date(review.date).toLocaleDateString()}</p>
              <p>{review.rating}</p>
            </div>
            <h4>{review.title || "User Feedback"}</h4>
            <p>{review.comment}</p>
          </div>
        ))}

        {/* Loading / End State */}
        {loading && <p>Loading more feedback...</p>}
        {!hasMore && !loading && <p style={{ textAlign: "center" }}>No more reviews.</p>}
        <div ref={observerRef} style={{ height: 1 }}></div>
      </section>
    </div>
  );
}
const express = require('express');
const router = express.Router();
const { promisePool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { validateFeedback, handleValidationErrors } = require('../middleware/validation');

// POST /api/feedback - Submit feedback (public endpoint)
router.post('/', validateFeedback, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, subject, message, rating } = req.body;

    const insertQuery = `
      INSERT INTO feedback (name, email, subject, message, rating)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await promisePool.execute(insertQuery, [
      name,
      email || null,
      subject || null,
      message,
      rating || null
    ]);

    // Get the created feedback
    const [feedback] = await promisePool.execute(
      'SELECT * FROM feedback WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: {
        id: feedback[0].id,
        name: feedback[0].name,
        email: feedback[0].email,
        subject: feedback[0].subject,
        message: feedback[0].message,
        rating: feedback[0].rating,
        created_at: feedback[0].created_at
      }
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: 'SERVER_ERROR'
    });
  }
});

// GET /api/feedback - Get all feedback (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    // Get total count
    const [countResult] = await promisePool.execute(
      'SELECT COUNT(*) as total FROM feedback'
    );
    const total = countResult[0].total;

    // Get feedback with pagination
    const [feedback] = await promisePool.execute(
      `SELECT * FROM feedback 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: {
        feedback,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error retrieving feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve feedback',
      error: 'SERVER_ERROR'
    });
  }
});

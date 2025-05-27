const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisePool } = require('../config/database');
const { validateLogin } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/admin/login - Admin login
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const [rows] = await promisePool.execute(
      'SELECT id, username, password FROM admins WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const admin = rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username
        },
        expires_in: process.env.JWT_EXPIRES_IN || '7d'
      }
    });

  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/admin/profile - Get admin profile (requires authentication)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT id, username, created_at FROM admins WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: rows[0]
    });

  } catch (error) {
    console.error('Error getting admin profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/admin/verify-token - Verify if token is valid
router.post('/verify-token', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    data: {
      admin: {
        id: req.user.id,
        username: req.user.username
      }
    }
  });
});

// GET /api/admin/stats - Get dashboard statistics (requires authentication)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Get total feedback count
    const [totalCount] = await promisePool.execute('SELECT COUNT(*) as total FROM feedback');
    
    // Get feedback count by rating
    const [ratingStats] = await promisePool.execute(`
      SELECT rating, COUNT(*) as count 
      FROM feedback 
      GROUP BY rating 
      ORDER BY rating
    `);

    // Get recent feedback count (last 7 days)
    const [recentCount] = await promisePool.execute(`
      SELECT COUNT(*) as recent 
      FROM feedback 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);

    // Get average rating
    const [avgRating] = await promisePool.execute('SELECT AVG(rating) as average FROM feedback');

    res.json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: {
        total_feedback: totalCount[0].total,
        recent_feedback: recentCount[0].recent,
        average_rating: parseFloat(avgRating[0].average || 0).toFixed(1),
        rating_distribution: ratingStats
      }
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
// Validation middleware for feedback submission
const validateFeedback = (req, res, next) => {
  const { name, rating, comment } = req.body;
  const errors = [];

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
    errors.push('Rating is required and must be a number between 1 and 5');
  }

  if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
    errors.push('Comment is required and must be a non-empty string');
  }

  // Validate optional email
  if (req.body.email && req.body.email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      errors.push('Email must be a valid email address');
    }
  }

  // Validate string lengths
  if (name && name.length > 100) {
    errors.push('Name must not exceed 100 characters');
  }

  if (req.body.email && req.body.email.length > 100) {
    errors.push('Email must not exceed 100 characters');
  }

  if (req.body.product_name && req.body.product_name.length > 100) {
    errors.push('Product name must not exceed 100 characters');
  }

  if (comment && comment.length > 1000) {
    errors.push('Comment must not exceed 1000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors
    });
  }

  // Sanitize inputs
  req.body.name = name.trim();
  req.body.comment = comment.trim();
  if (req.body.email) req.body.email = req.body.email.trim();
  if (req.body.product_name) req.body.product_name = req.body.product_name.trim();

  next();
};

// Validation middleware for admin login
const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    errors.push('Username is required');
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors
    });
  }

  req.body.username = username.trim();
  next();
};

module.exports = {
  validateFeedback,
  validateLogin
};
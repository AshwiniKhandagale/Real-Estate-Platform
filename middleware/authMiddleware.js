const jwt = require('jsonwebtoken');
const { USER_SERVICE_URL } = process.env;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }

  // Remove "Bearer " from token if present
  const bearerToken = token.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Continue to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;

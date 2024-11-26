const jwt = require('jsonwebtoken');
const SECRET_KEY = 'a4d62e1cf3c8ab7f9e8f6e5c3a2b1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0';

exports.authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Token is required.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify and decode token
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.error('Token error:', err.message);
    return res.status(403).json({
      status: 403,
      message: err.name === 'TokenExpiredError'
        ? 'Token has expired. Please log in again.'
        : 'Invalid token.',
    });
  }
};

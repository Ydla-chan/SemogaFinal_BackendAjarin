'use strict';
const jwt = require('jsonwebtoken');

const SECRET_KEY = '97stqM7hAZBKI42BNKqdXJbr_UPYzUUE1Z0PGs6gv-8mPBcGDacW4K8o2b37gWDI'; // Ganti dengan secret key yang kuat

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Generate token for login
exports.generateToken = (user) => {
  const payload = {
    id: user.userid,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

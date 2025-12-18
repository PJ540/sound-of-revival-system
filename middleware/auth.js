const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.session.userId && req.session.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access denied. Admin only.');
  }
};

module.exports = { authMiddleware, adminMiddleware };
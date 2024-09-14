// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from the header

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    console.log(user);
    req.user = user; // Attach the user info to the request object
    next();
  });
};

const requireAdmin = (req, res, next) => {
  console.log(req.user.role);
  if ((req.user.role!=="admin")) {
    return res.status(403).json({ message: 'Admin access required' });
  } 
  
  next();
};

module.exports = { authenticateToken, requireAdmin };


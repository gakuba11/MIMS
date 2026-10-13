const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sequalizer-secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

const AllowedRoles = (...roles) => {
  const roleList = roles.flat();

  return (req, res, next) => {
    if (!req.user || !roleList.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
    }
    next();
  };
};

module.exports = {
  auth,
  AllowedRoles,
};

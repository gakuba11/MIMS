const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../database/models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'sequalizer-secret';

const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return typeof password === 'string' && regex.test(password);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.split(' ')[1];
};

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: 'Username, email, and password are required',
    });
  }

  const normalizedRole = role === 'admin' ? 'admin' : 'pharmacist';

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      error: 'Password must contain at least 8 characters, uppercase, lowercase, a number, and a special character',
    });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'Username or email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      userId: user.id,
      role: user.role,
    });
  } catch (err) {
    console.error('REGISTER ERROR:', err);

    return res.status(500).json({
      error: 'Server error during registration',
    });
  }
};

exports.registerPharmacist = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: 'Username, email, and password are required',
    });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      error: 'Password must contain at least 8 characters, uppercase, lowercase, a number, and a special character',
    });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'Username or email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'pharmacist',
    });

    return res.status(201).json({
      success: true,
      message: 'Pharmacist registered successfully',
      userId: user.id,
      role: user.role,
    });
  } catch (err) {
    console.error('REGISTER PHARMACIST ERROR:', err);
    return res.status(500).json({
      error: 'Server error during pharmacist registration',
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password are required',
    });
  }

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid username or password',
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        error: 'Invalid username or password',
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      users: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);

    return res.status(500).json({
      error: 'Server error during login',
    });
  }
};

exports.logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

exports.profile = (req, res) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: 'User profile',
      users: {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch (err) {
    console.error('PROFILE TOKEN ERROR:', err);

    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
};

exports.report = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role'],
    });

    return res.status(200).json({
      success: true,
      message: 'Report generated successfully',
      summary: {
        totalUsers: users.length,
        admins: users.filter((user) => user.role === 'admin').length,
        pharmacists: users.filter((user) => user.role === 'pharmacist').length,
      },
      users,
    });
  } catch (err) {
    console.error('REPORT ERROR:', err);
    return res.status(500).json({
      error: 'Server error while generating report',
    });
  }
};

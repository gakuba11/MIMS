const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { auth, AllowedRoles } = require('../middleware/Auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/register-pharmacist', auth, AllowedRoles('admin'), userController.registerPharmacist);
router.post('/logout', auth, userController.logout);
router.get('/profile', auth, userController.profile);
router.get('/report', auth, AllowedRoles('admin', 'pharmacist'), userController.report);

module.exports = router;

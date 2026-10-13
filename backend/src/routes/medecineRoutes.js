const express = require('express');
const router = express.Router();
const MedecineController = require('../controllers/medecineController');
const { auth } = require('../middleware/Auth');

router.post('/medecines', auth, MedecineController.createMedecine);
router.get('/medecines', auth, MedecineController.getMedecines);
router.put('/medecines/:id', auth, MedecineController.updateMedecine);
router.delete('/medecines/:id', auth, MedecineController.deleteMedecine);

module.exports = router;
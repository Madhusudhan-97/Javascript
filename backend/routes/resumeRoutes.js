const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, resumeController.getResume);
router.put('/', authMiddleware, resumeController.updateResume);
router.get('/export', authMiddleware, resumeController.exportResume);

module.exports = router;
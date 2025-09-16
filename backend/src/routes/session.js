const express = require('express');
const { getSessionHistory, resetSession } = require('../controllers/sessionController');

const router = express.Router();

router.get('/history', getSessionHistory);
router.post('/reset', resetSession);

module.exports = router;

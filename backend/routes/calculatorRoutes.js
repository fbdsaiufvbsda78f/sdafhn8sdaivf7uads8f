const express = require('express');
const router = express.Router();
const { calculateLoan } = require('../controllers/calculatorController');

router.post('/calculate', calculateLoan);

module.exports = router;

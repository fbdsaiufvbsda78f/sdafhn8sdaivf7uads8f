const express = require('express');
const router = express.Router();
const {
  getAllCreditTypes,
  createCreditType,
  updateCreditType,
  deleteCreditType,
} = require('../controllers/creditTypeController');

router.get('/', getAllCreditTypes);
router.post('/', createCreditType);
router.put('/:id', updateCreditType);
router.delete('/:id', deleteCreditType);

module.exports = router;

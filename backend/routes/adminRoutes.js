const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation');

router.get('/calculations', async (req, res) => {
  try {
    const calculations = await Calculation.find();
    res.json(calculations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/calculations/:id', async (req, res) => {
  try {
    await Calculation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Расчет удален' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/export', async (req, res) => {
  try {
    const calculations = await Calculation.find();
    let csv = '\uFEFF' + 'Тип расчета,Сумма,Процентная ставка,Срок,Ежемесячный платеж,Email,Дата\n';
    calculations.forEach(calc => {
      csv += `${calc.calculationType},${calc.principalAmount},${calc.interestRate},${calc.loanTerm},${calc.monthlyPayment},${calc.userEmail},${calc.createdAt}\n`;
    });
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment('calculations.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

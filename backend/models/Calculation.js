const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
  calculationType: String,
  principalAmount: Number,
  interestRate: Number,
  loanTerm: Number,
  monthlyPayment: Number,
  userEmail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Calculation', CalculationSchema);

const mongoose = require('mongoose');

const CreditTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CreditType = mongoose.model('CreditType', CreditTypeSchema);

const defaultCreditTypes = [
  { name: 'Ипотека', interestRate: 9.6},
  { name: 'Автокредит', interestRate: 3.5},
  { name: 'Потребительский кредит', interestRate: 14.5,},
];

async function initializeCreditTypes() {
  try {
    await CreditType.insertMany(defaultCreditTypes);
  } catch (err) {
    console.error(`Ошибка при добавлении предустановленных типов кредитов: ${err.message}`);
  }
}

initializeCreditTypes();

module.exports = CreditType;

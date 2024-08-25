const CreditType = require('../models/CreditType');

exports.getAllCreditTypes = async (req, res) => {
  try {
    const creditTypes = await CreditType.find();
    res.json(creditTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCreditType = async (req, res) => {
  const { name, interestRate } = req.body;

  try {
    const newCreditType = new CreditType({
      name,
      interestRate
    });

    await newCreditType.save();
    res.json(newCreditType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCreditType = async (req, res) => {
  const { id } = req.params;
  const { name, interestRate } = req.body;

  try {
    const updatedCreditType = await CreditType.findByIdAndUpdate(
      id,
      { name, interestRate },
      { new: true }
    );

    if (!updatedCreditType) {
      return res.status(404).json({ error: 'Тип кредита не найден' });
    }

    res.json(updatedCreditType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCreditType = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCreditType = await CreditType.findByIdAndDelete(id);

    if (!deletedCreditType) {
      return res.status(404).json({ error: 'Тип кредита не найден' });
    }

    res.json({ message: 'Тип кредита удален' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

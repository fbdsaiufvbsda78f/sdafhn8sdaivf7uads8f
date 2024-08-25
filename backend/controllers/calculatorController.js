const Calculation = require('../models/Calculation');
const nodemailer = require('nodemailer');

exports.calculateLoan = async (req, res) => {
  const { calculationType, principalAmount, interestRate, loanTerm, monthlyPayment, userEmail } = req.body;
  const calculation = new Calculation({
    calculationType,
    principalAmount,
    interestRate,
    loanTerm,
    monthlyPayment,
    userEmail,
  });

  await calculation.save();

  if (userEmail) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '123@gmail.com',
        pass: '123',
      },
    });
  
    let mailOptions = {
      from: '123@gmail.com',
      to: userEmail,
      subject: 'Результаты расчета кредита',
      text: `Ваш ежемесячный платеж составит ${monthlyPayment} рублей.`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  }
  
  res.json({ userEmail });
};

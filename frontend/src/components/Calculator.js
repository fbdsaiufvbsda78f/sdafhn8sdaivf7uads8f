import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreditCalculator() {
  const [creditTypes, setCreditTypes] = useState([]);
  const [calculationType, setcalculationType] = useState('');
  const [principalAmount, setAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/credit-types')
      .then(response => setCreditTypes(response.data))
      .catch(error => console.error('Ошибка при загрузке типов кредитов', error));
  }, []);

  const calculatePayment = async (e) => {
    const selectedCredit = creditTypes.find(type => type.name === calculationType);
    if (!selectedCredit) return;

    const loanAmount = principalAmount - downPayment;
	const interestRate = selectedCredit.interestRate
    const monthlyRate = interestRate / 12 / 100;
    const totalRate = Math.pow(1 + monthlyRate, loanTerm * 12);
    const monthlyPayment = loanAmount * monthlyRate * totalRate / (totalRate - 1);
	
    const response = await axios.post('http://localhost:5000/api/calculator/calculate', {
	  calculationType,
	  principalAmount,
      interestRate,
      loanTerm,
	  monthlyPayment,
      userEmail,
    });
	
    setMonthlyPayment(monthlyPayment.toFixed(2));
  };
  
  return (
    <div>
      <h2>Калькулятор кредита</h2>
      <div>
        <label>Тип кредита:</label>
        <select value={calculationType} onChange={(e) => setcalculationType(e.target.value)}>
          <option value="">Выберите тип кредита</option>
          {creditTypes.map(type => (
            <option key={type._id} value={type.name}>
              {type.name} ({type.interestRate}%)
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Сумма кредита:</label>
        <input
          type="number"
          value={principalAmount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Первоначальный взнос:</label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Срок кредита (в годах):</label>
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </div>
      <div>
		<label>Email для отправки результатов:</label>
		<input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <button onClick={calculatePayment}>Рассчитать</button>

      {monthlyPayment && (
        <div>
          <h3>Ежемесячный платеж: {monthlyPayment} руб.</h3>
        </div>
      )}
    </div>
  );
}

export default CreditCalculator;

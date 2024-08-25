import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreditTypesList from './CreditTypesList';
import EditCreditType from './EditCreditType';

function AdminPanel() {
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    fetchCalculations();
  }, []);

  const fetchCalculations = async () => {
    const response = await axios.get('http://localhost:5000/admin/calculations');
    setCalculations(response.data);
  };

  const deleteCalculation = async (id) => {
    await axios.delete(`http://localhost:5000/admin/calculations/${id}`);
    fetchCalculations();
  };

  const exportCalculations = () => {
    window.open('http://localhost:5000/admin/export', '_blank');
  };

  const [selectedType, setSelectedType] = useState(null);

  const handleEdit = (type) => {
    setSelectedType(type);
  };

  const handleSave = () => {
    setSelectedType(null);
  };

  return (
    <div>
      <h1>Панель администратора</h1>
      <CreditTypesList onEdit={handleEdit} />
      <EditCreditType selectedType={selectedType} onSave={handleSave} />
      <button onClick={exportCalculations}>Экспортировать расчеты в CSV</button>
      <table>
        <thead>
          <tr>
            <th>Тип расчета</th>
            <th>Сумма</th>
            <th>Процентная ставка</th>
            <th>Срок</th>
            <th>Ежемесячный платеж</th>
            <th>Email</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {calculations.map((calc) => (
            <tr key={calc._id}>
              <td>{calc.calculationType}</td>
              <td>{calc.principalAmount}</td>
              <td>{calc.interestRate}</td>
              <td>{calc.loanTerm}</td>
              <td>{calc.monthlyPayment}</td>
              <td>{calc.userEmail}</td>
              <td>{new Date(calc.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteCalculation(calc._id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;

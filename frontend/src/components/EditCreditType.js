import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditCreditType({ selectedType, onSave }) {
  const [name, setName] = useState('');
  const [interestRate, setInterestRate] = useState('');

  useEffect(() => {
    if (selectedType) {
      setName(selectedType.name);
      setInterestRate(selectedType.interestRate);
    }
  }, [selectedType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, interestRate };

    if (selectedType) {
      await axios.put(`http://localhost:5000/api/credit-types/${selectedType._id}`, data);
    } else {
      await axios.post('http://localhost:5000/api/credit-types', data);
    }

    onSave();
    setName('');
    setInterestRate('');
  };

  return (
    <div>
      <h2>{selectedType ? 'Редактировать тип кредита' : 'Создать новый тип кредита'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Процентная ставка:</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default EditCreditType;

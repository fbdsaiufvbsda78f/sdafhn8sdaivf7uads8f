import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreditTypesList({ onEdit }) {
  const [creditTypes, setCreditTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/credit-types')
      .then(response => setCreditTypes(response.data))
      .catch(error => console.error('Ошибка при загрузке типов кредитов', error));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/credit-types/${id}`);
    setCreditTypes(creditTypes.filter(type => type._id !== id));
  };

  return (
    <div>
      <h2>Типы кредитов</h2>
      <ul>
        {creditTypes.map(type => (
          <li key={type._id}>
            {type.name} ({type.interestRate}%) 
            <button onClick={() => onEdit(type)}>Редактировать</button>
            <button onClick={() => handleDelete(type._id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreditTypesList;

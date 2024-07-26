import React, { useState } from 'react';
import axios from 'axios';
import Back from './Back';

const Buy = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  const handleBuy = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/buy', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Обработка успешного ответа
      setOrderDetails({
        sum: response.data.sum,
        createdAt: response.data.created_at
      });
      setError(''); // Очистить предыдущие ошибки
    } catch (err) {
      // Обработка ошибки
      setError('Error processing purchase');
      setOrderDetails(null); // Очистить предыдущие данные заказа
    }
  };

  return (
    <div>
      <h2>Buy</h2>
      <button onClick={handleBuy}>Confirm Purchase</button>
      {orderDetails && (
        <div>
          <h3>Order Details</h3>
          <p><strong>Sum:</strong> ${orderDetails.sum.toFixed(2)}</p>
          <p><strong>Created At:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p>
        </div>
      )}
      {error && <p>{error}</p>}

      <Back />
    </div>
  );
};

export default Buy;

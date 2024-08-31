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

      // Парсинг строки productIds
      const productIdsString = response.data.productIds;
      const productEntries = productIdsString.split('|').filter(entry => entry); // Удаляем пустые строки
      const products = productEntries.map(entry => {
        const [name, quantity] = entry.split(':');
        return { name, quantity: parseInt(quantity, 10) };
      });

      // Установка данных в состояние
      setOrderDetails({
        sum: response.data.sum,
        products: products
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
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <p>{error}</p>}

      <Back />
    </div>
  );
};

export default Buy;

// src/Orders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Получение токена из локального хранилища
        const token = localStorage.getItem('token');
        
        // Выполнение GET-запроса с токеном в заголовке
        const response = await axios.get('http://localhost:8080/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Обработка успешного ответа
        setOrders(response.data);
        setError(''); // Очистка предыдущих ошибок
      } catch (err) {
        // Обработка ошибки
        setError('Error fetching orders');
        setOrders([]); // Очистка предыдущих данных заказа
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client ID</th>
            <th>Product IDs</th>
            <th>Sum</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.clientId}</td>
              <td>{order.products_ids}</td>
              <td>${order.sum.toFixed(2)}</td>
              <td>{order.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

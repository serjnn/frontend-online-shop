import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Buy from './Buy';

const Bucket = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [apiTotal, setApiTotal] = useState(0);
  const [userInfo, setUserInfo] = useState({ balance: 0, address: '' });
  const [serverResponse, setServerResponse] = useState(''); // Состояние для хранения ответа от сервера

  useEffect(() => {
    const fetchBucketItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bucket', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setItems(response.data);

        // Расчёт общей стоимости
        const totalCost = response.data.reduce((sum, item) => {
          return sum + item.product.price * item.quantity;
        }, 0);
        setCalculatedTotal(totalCost);
      } catch (err) {
        setError('Error fetching bucket items');
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/myInfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserInfo({
          balance: response.data.balance,
          address: response.data.address
        });
      } catch (err) {
        setError('Error fetching user info');
      }
    };

    const fetchTotal = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sum', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setApiTotal(response.data); // Предполагается, что API возвращает число
      } catch (err) {
        setError('Error fetching total sum');
      }
    };

    fetchBucketItems();
    fetchUserInfo();
    fetchTotal();
  }, []);

  // Функция для удаления товара
  const handleRemoveItem = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Сохранение ответа от сервера
      setServerResponse(response.data.message || 'Item removed successfully');

      // Обновляем список товаров после удаления
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);

      // Пересчитываем общую стоимость
      const updatedTotalCost = updatedItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0);
      setCalculatedTotal(updatedTotalCost);

      // Пересчитываем общую сумму
      const totalResponse = await axios.get('http://localhost:8080/api/sum', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setApiTotal(totalResponse.data);
    } catch (err) {
      setError('Error removing item');
    }
  };

  return (
    <div>
      <h2>Bucket</h2>
      {error && <p>{error}</p>}
      {serverResponse && <p>{serverResponse}</p>} {/* Вывод ответа от сервера */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th> {/* Новая колонка для кнопок */}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>${item.product.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.product.id)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Total Order Cost: 
        <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>
          ${calculatedTotal.toFixed(2)}
        </span>
        ${apiTotal.toFixed(2)}
      </h3>
      <h3>User Info</h3>
      <p><strong>Balance:</strong> ${userInfo.balance.toFixed(2)}</p>
      <p><strong>Address:</strong> {userInfo.address}</p>
      <Buy />
    </div>
  );
};

export default Bucket;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Buy from './Buy';

const Bucket = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [userInfo, setUserInfo] = useState({ balance: 0, address: '' });

  useEffect(() => {
    const fetchBucketItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bucket', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setItems(response.data);

        // Расчет общей стоимости
        const totalCost = response.data.reduce((sum, item) => {
          return sum + item.product.price * item.quantity;
        }, 0);

        setTotal(totalCost);
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

    fetchBucketItems();
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h2>Bucket</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>${item.product.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.product.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Order Cost: ${total.toFixed(2)}</h3>
      <h3>User Info</h3>
      <p><strong>Balance:</strong> ${userInfo.balance.toFixed(2)}</p>
      <p><strong>Address:</strong> {userInfo.address}</p>
            <Buy />

    </div>
  );
};

export default Bucket;

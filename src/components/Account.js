import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Back from './Back';

const Account = () => {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/myInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user info');
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleAddBalance = async () => {
    try {
      await axios.post('http://localhost:8080/api/addBalance',null, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
            amount: balance
          }
      });
      setUser({ ...user, balance: user.balance + Number(balance) });
      setBalance('');
    } catch (err) {
      setError('Error adding balance');
    }
  };

  const handleChangeAddress = async () => {
    try {
      await axios.post('http://localhost:8080/api/changeAddress', null, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
            address: address
          }
      });
      setUser({ ...user, address: address });
      setAddress('');
    } catch (err) {
      setError('Error changing address');
    }
  };

  return (
    <div>
      <h2>Личный кабинет</h2>
      {error && <p>{error}</p>}
      <p>ID: {user.id}</p>
      <p>Почта: {user.mail}</p>
      <p>Адрес: {user.address}</p>
      <p>Баланс: {user.balance}</p>

      <div>
        <h3>Пополнить баланс</h3>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Введите сумму"
        />
        <button onClick={handleAddBalance}>Пополнить</button>
      </div>

      <div>
        <h3>Изменить адрес</h3>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Введите новый адрес"
        />
        <button onClick={handleChangeAddress}>Изменить</button>
      </div>
      <Back />
    </div>
  );
};

export default Account;

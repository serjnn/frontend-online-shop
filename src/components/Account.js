import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; 
import Back from './Back';
import Header from './Header';

const Account = () => {
  const { user, setUser } = useUser(); 
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');


  
  const handleAddBalance = async () => {
    try {

      await axios.get(`http://localhost:8989/client/api/v1/addBalance/${user.id}/${balance}`, {
        headers: {
          Authorization: `Bearer ${token}`
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
      await axios.post('http://localhost:8989/client/api/v1/changeAddress', null, {
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
      <Header />
      <h2>Личный кабинет</h2>
      {error && <p>{error}</p>}
      <p>Почта: {user?.mail}</p>
      <p>Адрес: {user?.address}</p>
      <p>Баланс: {user?.balance}</p>

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

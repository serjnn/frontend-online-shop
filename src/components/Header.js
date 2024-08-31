import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Подключите файл стилей

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUserInfo(null);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/myInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserInfo({
          mail: response.data.mail,
          balance: response.data.balance
        });
      } catch (err) {
        setError('Error fetching user info');
        setUserInfo(null); // Очистить данные пользователя при ошибке
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo(null);
    navigate('/'); // Перенаправление на страницу входа
  };

  return (
    <header className="header">
      <div className="header-content">
        {userInfo ? (
          <div className="user-info">
            <p>Email: {userInfo.mail}</p>
            <p>Balance: ${userInfo.balance.toFixed(2)}</p>
            <nav>
              <Link to="/categories">Categories</Link>
              <Link to="/account">Account</Link>
              <Link to="/bucket">Bucket</Link>
              <Link to="/orders">Orders</Link>
              
              <button onClick={handleLogout}>Logout</button>
            </nav>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/auth">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <hr className="divider" />
    </header>
  );
};

export default Header;

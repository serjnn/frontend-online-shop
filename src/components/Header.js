import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Импортируйте созданный контекст
import './Header.css'; // Подключите файл стилей
import axios from 'axios';


const Header = () => {
  const { user, setUser } = useUser(); // Используем контекст
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8989/client/api/v1/myInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser({
          address: response.data.address,
          mail: response.data.mail,
          balance: response.data.balance,
          id: response.data.id // Добавьте id, если нужно
        });
      } catch (err) {
        setError('Error fetching user info');
        setUser(null); // Очистить данные пользователя при ошибке
      }
    };

    fetchUserInfo();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/'); // Перенаправление на страницу входа
  };

  return (
    <header className="header">
      <div className="header-content">
        {user ? (
          <div className="user-info">
            <p>Id: {user.id}</p>
            <p>Email: {user.mail}</p>
            <p>Balance: ${user.balance.toFixed(2)}</p>
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

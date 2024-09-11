import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8989/client/api/v1/auth', {
        mail,
        password
      });
      
      // Получение и сохранение токена в localStorage
      const token = response.data;
      localStorage.setItem('token', token);
      
      navigate('/');
    } catch (error) {
      console.error('Ошибка входа:', error);
      setMessage('Ошибка входа. Попробуйте снова.');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mail">Электронная почта:</label>
          <input
            type="email"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Войти</button>
      </form>
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;

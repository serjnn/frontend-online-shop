import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  // Состояния для полей формы
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  
  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    try {
      // Отправка данных на сервер
      const response = await axios.post('http://localhost:8080/api/register', {
        mail,
        password,
        role
      });
      
      // Успешная регистрация
      setMessage('Регистрация успешна!');
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка регистрации:', error);
      setMessage('Ошибка регистрации. Попробуйте снова.');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Электронная почта:</label>
          <input
            type="mail"
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
        
        <div>
          <label htmlFor="role">Роль:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Выберите роль</option>
            <option value="client">Клиент</option>
            <option value="manager">Менеджер</option>
            <option value="admin">Администратор</option>
          </select>
        </div>
        
        <button type="submit">Зарегистрироваться</button>
      </form>
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
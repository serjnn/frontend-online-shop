import React from 'react';
import { Link } from 'react-router-dom';
import Back from './Back';

function Info() {
  return (
    <div>
      <h1>Информация</h1>
      <p>Здесь содержится какая-то информация.</p>
     <Back />
    </div>
  );
}

export default Info;
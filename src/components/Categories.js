import React from 'react';
import { Link } from 'react-router-dom';
import Back from './Back';

const Categories = () => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        <li><Link to="/categories/ELECTRONICS">Electronics</Link></li>
        <li><Link to="/categories/FOOD">Food</Link></li>
        <li><Link to="/categories/CLOTH">Cloth</Link></li>
        <li><Link to="/categories/TOYS">Toys</Link></li>
      </ul>
      <Back />
    </div>
  );
};

export default Categories;
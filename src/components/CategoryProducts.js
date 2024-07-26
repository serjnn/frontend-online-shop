import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Back from './Back';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const handleClick = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/${id}`, {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
      });
      
      // Обновляем состояние с данными от сервера, если это необходимо
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/categories/${category}`);
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h2>Products in {category}</h2>
      {error && <p>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} <span> </span>
            {product.price}
            <button onClick={() => handleClick(product.id)}>+</button>
          </li>
        ))}
      </ul>
      <Back />
    </div>
  );
};

export default CategoryProducts;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useUser } from './UserContext'; 

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser(); 

  const handleClick = async (productId) => {
    try {
      const token = localStorage.getItem('token');
  
      
      const clientId = user.id;
  
      const headers = {
        Authorization: `Bearer ${token}`, 
      };
  
      const res = await axios.get(`http://localhost:8989/bucket/api/v1/add/${clientId}/${productId}`, { headers });
  
      console.log(res.data);
    } catch (error) {
      console.error('Error adding product to bucket:', error);
      setError('Error adding product to bucket');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8989/product/api/v1/by-cat/${category}`);
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <Header />
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
      <Link to="/categories"><button>Back</button></Link>
    </div>
  );
};

export default CategoryProducts;

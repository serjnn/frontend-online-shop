import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { useUser } from './UserContext'; 

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser();

  // Function to add a product to the bucket
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

  // Function to subscribe to a product for discount notifications
  const handleSubscribe = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const clientId = user.id;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(`http://localhost:8989/product/api/v1/subscribe/${clientId}/${productId}`, { headers });
      console.log('Subscribed to product for discount notifications:', res.data);
    } catch (error) {
      console.error('Error subscribing to product:', error);
      setError('Error subscribing to product');
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
            {product.name} - ${product.price.toFixed(2)}
            <button onClick={() => handleClick(product.id)}>+</button>
            <button onClick={() => handleSubscribe(product.id)}>Subscribe</button>
          </li>
        ))}
      </ul>
      <Link to="/categories"><button>Back</button></Link>
    </div>
  );
};

export default CategoryProducts;

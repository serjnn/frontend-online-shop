import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Bucket = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBucketItems = async () => {
      try {
        // Fetch all buckets without a token
        const response = await axios.get('http://localhost:8989/bucket/api/v1/all');
        setItems(response.data);
      } catch (err) {
        setError('Error fetching bucket items');
      }
    };

    fetchBucketItems();
  }, []);

  return (
    <div>
      <Header />
      <h2>Bucket Items</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.clientId}</td>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bucket;

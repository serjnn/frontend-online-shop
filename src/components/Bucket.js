import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useUser } from './UserContext';

const Bucket = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser(); // Access the user object from context

  useEffect(() => {
    const fetchBucketItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get(`http://localhost:8989/bucket/api/v1/getCompleteBucket/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the request headers
          },
        });
        setItems(response.data); // Update the state with fetched data
      } catch (err) {
        setError('Error fetching bucket items');
      }
    };

    if (user.id) {
      fetchBucketItems(); // Fetch items if user.id exists
    }
  }, [user.id]);

  // Handle removing item from the bucket
  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      await axios.get(`http://localhost:8989/bucket/api/v1/remove/${user.id}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the request headers
        },
      });
      // Re-fetch bucket items after removal
      fetchBucketItems();
    } catch (err) {
      setError('Error removing item from bucket');
    }
  };

  // Function to fetch bucket items
  const fetchBucketItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.get(`http://localhost:8989/bucket/api/v1/getCompleteBucket/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the request headers
        },
      });
      setItems(response.data); // Update the state with fetched data
    } catch (err) {
      setError('Error fetching bucket items');
    }
  };

  const totalSum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <h2>Bucket Items</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)}>-</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No items in the bucket.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <h3>Total Sum: ${totalSum.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Bucket;

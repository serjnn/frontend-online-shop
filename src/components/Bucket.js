import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useUser } from './UserContext';
import { v4 as uuidv4 } from 'uuid';


const Bucket = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const { user } = useUser(); 

  useEffect(() => {
    const fetchBucketItems = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`http://localhost:8989/bucket/api/v1/getCompleteBucket/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data); 
      } catch (err) {
        setError('Error fetching bucket items');
      }
    };

    if (user.id) {
      fetchBucketItems();
    }
  }, [user.id]);

  
  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.get(`http://localhost:8989/bucket/api/v1/remove/${user.id}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  
      fetchBucketItems();
    } catch (err) {
      setError('Error removing item from bucket');
    }
  };


  const fetchBucketItems = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get(`http://localhost:8989/bucket/api/v1/getCompleteBucket/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setItems(response.data); 
    } catch (err) {
      setError('Error fetching bucket items');
    }
  };

 
  const totalSum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

 
  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const orderId = uuidv4();

      
      const orderDTO = {
        orderId: orderId,
        clientID: user.id,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalSum: totalSum,
      };

     
      await axios.post('http://localhost:8989/orchestrator/api/v1', orderDTO, { 
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      alert('Purchase successful!');
    } catch (err) {
      setError('Error processing purchase');
    }
  };

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
      {}
      <button onClick={handlePurchase} disabled={items.length === 0}>
        Buy
      </button>
    </div>
  );
};

export default Bucket;

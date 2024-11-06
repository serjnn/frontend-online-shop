import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import Header from './Header';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); 
  const { user } = useUser(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        
       
        if (!user || !user.id) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }
        
       
        const response = await axios.get(`http://localhost:8989/order/api/v1/byClient/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        
        setOrders(response.data);
        setError(''); 
      } catch (err) {
        setError('Error fetching orders');
        setOrders([]); 
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchOrders(); 
    } else {
      setLoading(false);
    }
  }, [user]); 

  if (loading) {
    return <p>Loading orders...</p>; 
  }

  return (
    <div>
      <Header />
      <div>
      </div>
      <h2>Orders</h2>
      {error && <p>{error}</p>}
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product IDs</th>
              <th>Sum</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.products_ids}</td>
                <td>${order.sum.toFixed(2)}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
};

export default Orders;

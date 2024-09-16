import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // Import the custom hook to access UserContext
import Header from './Header';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // New loading state
  const { user } = useUser(); // Access the user object from context

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Check if user and clientId are available
        if (!user || !user.id) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }
        
        // Add user ID in the URL to fetch orders for the specific client
        const response = await axios.get(`http://localhost:8989/order/api/v1/byClient/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Successful response
        setOrders(response.data);
        setError(''); // Clear any previous errors
      } catch (err) {
        setError('Error fetching orders');
        setOrders([]); // Clear previous orders on error
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    if (user && user.id) {
      fetchOrders(); // Fetch orders only when user and user.id are available
    } else {
      setLoading(false);
    }
  }, [user]); // Only fetch orders when user is available

  if (loading) {
    return <p>Loading orders...</p>; // Display loading indicator
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

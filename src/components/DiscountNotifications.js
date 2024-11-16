import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useUser } from './UserContext';

let stompClient = null;

const DiscountNotifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [subscribedTopic, setSubscribedTopic] = useState(null);

  // Connect to the WebSocket server
  const connect = () => {
    if (!stompClient) {
      const socket = new SockJS('http://localhost:7099/ws');
      stompClient = over(socket);
      stompClient.connect({}, onConnected, onError);
    }
  };

  // Handle successful connection
  const onConnected = () => {
    console.log('Connected to WebSocket');
    setIsConnected(true);

    // Subscribe to the user's specific topic
    if (user?.id && !subscribedTopic) {
      const topic = `/topic/client/${user.id}`;
      stompClient.subscribe(topic, onMessageReceived);
      setSubscribedTopic(topic);
      console.log(`Subscribed to ${topic}`);
    } else if (!user?.id) {
      console.error('User ID is missing. Unable to subscribe.');
    }
  };

  // Handle errors
  const onError = (err) => {
    console.error('WebSocket error:', err);
  };

  // Handle incoming messages
  const onMessageReceived = (payload) => {
    try {
      const notification = JSON.parse(payload.body);

      // Add the notification only if it doesn't already exist in the state
      setNotifications((prevNotifications) => {
        const isDuplicate = prevNotifications.some(
          (n) =>
            n.productId === notification.productId &&
            n.clientId === notification.clientId &&
            n.discount === notification.discount
        );
        return isDuplicate ? prevNotifications : [...prevNotifications, notification];
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    if (user?.id) {
      connect();
    }

    return () => {
      if (stompClient && isConnected) {
        stompClient.disconnect(() => {
          console.log('Disconnected from WebSocket');
        });
        stompClient = null; // Reset the client to ensure no duplicate connections
        setSubscribedTopic(null); // Reset the subscribed topic
      }
    };
  }, [isConnected, user]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Discount Notifications</h1>

      {/* Display Received Notifications */}
      <h3>Received Discounts</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <strong>Product ID:</strong> {notification.productId}, 
            <strong> Client ID:</strong> {notification.clientId}, 
            <strong> Discount:</strong> {notification.discount}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscountNotifications;

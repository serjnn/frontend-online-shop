import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Back from './Back';


function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/clients')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.mail}</li>
        ))}
      </ul>
      <Back />
    </div>
    
  );
}

export default UserList;
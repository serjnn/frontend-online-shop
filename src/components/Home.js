import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Home() {
  return (
    <div>
      <Header />
      <h1>Главная страница</h1>
      <Link to="/info">
        <button>Info</button>
      </Link>
      <br></br>
      <Link to="/secured">
        <button>SECURED</button>
      </Link>
      <br></br>
      <Link to="/clients">
        <button>Clients list</button>
      </Link>
      <br></br>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home; 
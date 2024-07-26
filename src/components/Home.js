import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Home() {
  return (
    <div>
      <Header />
      <h1>Главная страница</h1>
 

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
      <br></br>
      <Link to="/auth">
        <button>authentication</button>
      </Link>
      <br></br>
      <Link to="/categories">
        <button>categories</button>
      </Link>
      <br></br>
      <Link to="/account">
        <button>Account page</button>
      </Link>
      <br></br>
      <Link to="/bucket">
        <button>Bucket</button>
      </Link>
    </div>
  );
}

export default Home; 
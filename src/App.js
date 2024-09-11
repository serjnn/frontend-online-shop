import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
import UserList from './components/UserList';
import Secured from './components/Secured';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Categories from './components/Categories';
import CategoryProducts from './components/CategoryProducts';
import Account from './components/Account';
import Bucket from './components/Bucket';
import Orders from './components/Orders';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<UserList />} />
            <Route path="/info" element={<Info />} />
            <Route path="/secured" element={<Secured />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/auth" element={<LoginForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bucket" element={<Bucket />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/categories/:category" element={<CategoryProducts />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;



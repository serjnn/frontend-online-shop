import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
import UserList from './components/UserList';
import Secured from './components/Secured';
import RegisterForm from './components/RegisterForm';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<UserList />} />
          <Route path="/info" element={<Info />} />
          <Route path="/secured" element={<Secured />} />
          <Route path="/register" element={<RegisterForm />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;



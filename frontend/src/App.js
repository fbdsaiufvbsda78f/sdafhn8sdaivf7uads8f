import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Events from './components/Events';
import Contacts from './components/Contacts';

function App() {
  return (
    <Router>
    <Header />
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contacts" element={<Contacts />} />
        </Routes>
    </Router>
  );
}

export default App;

import React, { createContext, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chef from './pages/Chef/Chef';
import Chef_Login from './pages/Chef_Login/Chef_Login';
import Customer from './pages/Customer/Customer';
import Navbar from './components/Navbar/Navbar';
import FoodStatus from './components/FoodStatus/FoodStatus';
import './App.css'

import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  return (
        <>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chef" element={<Chef />} />
        <Route path='/chef-login' element= {<Chef_Login />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/orderStatus' element = {<FoodStatus />} />      
        </Routes>
      </>
  );
}

export default App;

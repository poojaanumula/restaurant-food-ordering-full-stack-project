
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Chef from './pages/Chef/Chef';
import Customer from './pages/Customer/Customer';
import Navbar from './components/Navbar/Navbar';
import FoodStatus from './components/FoodStatus/FoodStatus';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  return (
        <>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chef" element={<Chef />} />
        <Route path='/chef-login' element= {<Chef/>} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/orderStatus' element = {<FoodStatus />} />      
        </Routes>
         <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
      />
      </>
  );
}

export default App;

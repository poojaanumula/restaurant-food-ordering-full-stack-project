
import './App.css'
import {Route,Routes} from "react-router-dom";
import Home from './pages/Home/Home';
import Chef_Login from './pages/Chef_Login/Chef_Login';
import Chef from './pages/Chef/Chef';
import Customer from './pages/Home/Customer/Customer';

function App() {
 
  return (
    <>
   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chef-login' element= {<Chef_Login />} />
        <Route path='/chef' element= {<Chef />} />
        <Route path='/customer' element={<Customer/>} />
      </Routes>
  
 
    </>
  )
}

export default App

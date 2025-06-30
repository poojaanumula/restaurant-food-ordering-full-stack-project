import React from 'react'
import Classes from './Navbar.module.scss'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className={Classes.navbar}>
       <h1>Spicy Corner</h1>
       <ul className={Classes.link}>
        <Link to="/customer">Customer</Link>
        <Link to="/chef-login">Chef</Link>
        <Link to="/dashboard">Dashboard</Link>
       </ul>
    </div>
  )
}

export default Navbar

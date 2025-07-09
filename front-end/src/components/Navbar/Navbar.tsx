import Classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={Classes.navbar}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Spicy Corner</h1>
        <img src="./images/chill.png" style={{ width: "100px" }} />
      </div>

      <ul className={Classes.link}>
        <Link to="/">Home</Link>
        <Link to="/customer">Customer</Link>
        <Link to="/chef-login">Chef</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/orderStatus">View Order Status</Link>
      </ul>
    </div>
  );
};

export default Navbar;

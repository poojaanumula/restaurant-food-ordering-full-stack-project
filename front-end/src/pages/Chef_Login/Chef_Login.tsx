import React, { useState } from "react";
import { useNavigate } from "react-router";
import Classes from "./Chef_Login.module.scss";

const Chef_Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e: any) => {
    e.preventDefault();
    if (user === "chef" && password === "123$A") {
      navigate("/chef");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className={Classes.background}>
      <div className={Classes.titleDisplay}>
        <h2 className={Classes.title}>Welcome Chef!!</h2>
        <img src="/images/chef.png" className={Classes.photo} />
      </div>

      <hr className={Classes.border} />
      <form onSubmit={submitForm}>
        <div className={Classes.section}>
          <label className={Classes.name}>UserName</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter Your UserName"
            className={Classes.textBox}
          />
        </div>
        <div className={Classes.section}>
          <label className={Classes.name}>Password</label>
          <input
            className={Classes.textBox}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
        </div>
        <div>
          <button type="submit" className={Classes.btn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chef_Login;

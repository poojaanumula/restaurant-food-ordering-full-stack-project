import React, { useState } from 'react'
import { useNavigate } from "react-router";

const Chef_Login = () => {
 const navigate = useNavigate();
 const [user,setUser]= useState('');
 const [password, setPassword]= useState('')
  const submitForm = (e:any)=>{
          e.preventDefault();
          if(user==='chef' && password === '123$A')
          {
            navigate('/chef');
          }
          else {
          alert('Invalid credentials');
          }
  }
  return (
    <div>
      Welcome Chef....
      <hr />
      <form onSubmit={submitForm}>
        <div>
            <label>UserName</label>
            <input type='text' value={user} onChange={(e)=> setUser(e.target.value)}/>
        </div>
        <div>
            <label>Password</label>
            <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <div>
            <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Chef_Login

import { useState } from 'react';
import API from './api.js';
import { Link } from 'react-router-dom';

function Login() {
  const [email , setemail]= useState("");
  const [pass , setpass]= useState("");

   const handleLogin = async () => {
    try {
      const res = await API.post("/create", {
        email,
        password,
      });

      alert(res.data.message);


    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };


  return <div  className="body"><div className="login-container">
    <h2>Welcome back 👋</h2>
    <p>Please enter your details to sign in.</p>

    <form >
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input onChange={(e)=>{setemail(e.target.value)}} type="email" id="email" placeholder="Enter your email" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input onChange={(e)=>{setpass(e.target.value)}} type="password" id="password" placeholder="Enter your password" required />
      </div>

      <button onClick={handleLogin}  type="submit" className="google-btn">Log In</button>
      <div className="signup-text">
          Don’t have an account? <Link to= "/SignUp">Sign up for free</Link>
      </div>
    </form>
  </div>
</div> 
};


export default Login;
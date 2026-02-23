import { useState } from 'react';
import styles from './signUP.module.css';
import { Link } from "react-router-dom";

function SignUp() {

  const [name , setName]= useState('');
  const [email, setEmail]= useState('');
  const [pass , setPass]= useState('');

  const handleSignup = async () => {
  try {
    const res = await API.post("/Signup", {
      name,
      email,
      password,
    });

    alert(res.data.message);
    prompt("user sign up");
  } catch (err) {
    console.log(err);
  }
};



  return ( 
    <div className={styles.Container} >
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <form>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input onChange={(e)=>{setName(e.target.value)}} type="text" id="name" name="name" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input  onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" name="email" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input  onChange={(e)=>{setPass(e.target.value)}} type="password" id="password" name="password" required />
          </div>

        

          <button type="submit" onClick={handleSignup} className={styles.signupBtn}>
            Sign Up
          </button>

        </form>

        <div className={styles.divider}>OR</div>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
    </div>
  );
}

export default SignUp;

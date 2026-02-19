import styles from './signUP.module.css';
import { Link } from "react-router-dom";

function SignUp() {
  return ( 
    <div className={styles.Container} >
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <form>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>

          <button type="submit" className={styles.signupBtn}>
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

function Login() {

  return <div  className="body"><div className="login-container">
    <h2>Welcome back 👋</h2>
    <p>Please enter your details to sign in.</p>

    <form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required />
      </div>

      <a href="#" className="forgot-link">Forgot password?</a>

      <button type="submit" className="google-btn">Sign In</button>

      <div className="divider">or</div>

      <button type="button" className="google-btn">Sign in with Google</button>

      <div className="signup-text">
        Don’t have an account? <a href="#">Sign up for free</a>
      </div>
    </form>
  </div>
</div> 
};


export default Login;
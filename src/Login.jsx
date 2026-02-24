import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/login", { email, password });
      alert(res.data?.message || "Login successful");
      navigate("/read");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2>Welcome back</h2>
        <p>Please enter your details to sign in.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button disabled={loading} type="submit" className="google-btn">
            {loading ? "Logging in..." : "Log In"}
          </button>
          <div className="signup-text">
            Don&apos;t have an account? <Link to="/signup">Sign up for free</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

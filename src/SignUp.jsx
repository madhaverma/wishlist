import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "./api";
import styles from "./signUp.module.css";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/signup", { name, email, password });
      alert(res.data?.message || "User created successfully");
      navigate("/login");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.signupPage}>
        <div className={styles.signupContainer}>
          <h2>Create Account</h2>
          <p>Sign up to get started</p>

          <form onSubmit={handleSignup}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className={styles.signupBtn}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <div className={styles.divider}>OR</div>

          <p className={styles.loginText}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

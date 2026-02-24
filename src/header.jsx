import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "./api";

function Header() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await API.get("/me");
        const authData = response?.data;

        const loggedIn = Boolean(authData?._id || authData?.id || authData?.email);

        setIsAuthenticated(loggedIn);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await API.post("/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">Wishlist</Link>
      </div>

      <div className="header-nav">
        <Link to="/about">Get started</Link>
        {isAuthenticated && <Link to="/create">Create</Link>}
        {isAuthenticated && <Link to="/read">Gallery</Link>}
      </div>

      <div className="header-buttons">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn-login">
              <b>Login</b>
            </Link>
            <Link to="/signup">
              <button className="btn-signup">Sign Up</button>
            </Link>
          </>
        ) : (
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;

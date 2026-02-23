import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "./api"; 

function Header() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/me");  
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location.pathname]);


  const handleLogout = async () => {
    await API.post("/logout");
    setIsAuthenticated(false);
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">Wishlist</Link>
      </div>

      <div className="header-nav">
        <Link to="/about">Get started</Link>
        {isAuthenticated && <Link to="/Create">Create</Link>}
        {isAuthenticated && <Link to="/read">Gallery</Link>}
      </div>

      <div className="header-buttons">
        {!isAuthenticated ? (
          <>
            <Link to="/Login" className="btn-login">
              <b>Login</b>
            </Link>
            <Link to="/SignUp">
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

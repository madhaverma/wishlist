import React from "react";
import { Link } from "react-router-dom";

function Home() {
  


  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
        
         <b>Create Your Perfect Wishlist .</b> 
        </h1>
        <p className="hero-description">
          The simplest way to get what you really want. Add items from any store,
          share with friends and family, and make every gift a perfect one.
        </p>
        <div className="hero-buttons">
          <a href="/login" className="btn-primary">
            Get Started For Free
          </a>
          <Link to="/about" className="btn-secondary">  How It Works </Link>
        </div>
      </div>

      <div className="hero-image-container">
        <img src="/wishlist.png" alt="list" className="hero-image" />
      </div>
    </div>
  );
}
export default Home;

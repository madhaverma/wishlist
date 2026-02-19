import React, { useState} from "react";

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
        <div class="hero-buttons">
          <a href="/login" class="btn-primary">
            Get Started For Free
          </a>
          <a href="#" class="btn-secondary">
            How It Works
          </a>
        </div>
      </div>

      <div className="hero-image-container">
        <img src="/wishlist.png" alt="list" className="hero-image" />
      </div>
    </div>
  );
}
export default Home;

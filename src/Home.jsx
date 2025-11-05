import React, { useState } from "react";

function Home() {
  const [value, setValue] = useState("Create");

  return (
    
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title"> {value } Your Prefect Wishlist  </h1>
          <p class="hero-description">
            The simplest way to get what you really want. Add items from any
            store, share with friends and family, and make every gift a perfect
            one.
          </p>
          <div class="hero-buttons">
            <a href="#" class="btn-primary">
              Get Started For Free
            </a>
            <a href="#" class="btn-secondary">
              How It Works
            </a>
          </div>
        </div>

        <div class="hero-image-container">
          <img src="/wishlist.png" alt="list" class="hero-image"/>
        </div>
      </div>
  );
}
export default Home;

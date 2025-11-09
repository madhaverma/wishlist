import React, { useState, useEffect } from "react";

function Home() {
  const [value, setValue] = useState("Create");

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev === "Create" ? "share" : "Create"));
    }, 5000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 key={value} className="hero-title">
        
          {value} Your Perfect Wishlist .
        </h1>
        <p className="hero-description">
          The simplest way to get what you really want. Add items from any store,
          share with friends and family, and make every gift a perfect one.
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

      <div className="hero-image-container">
        <img src="/wishlist.png" alt="list" className="hero-image" />
      </div>
    </div>
  );
}
export default Home;

import React from "react";


function Header(){

    return <div className="header"> 
  <div class="header-logo">Wishlist</div>
  <div class="header-nav">
    <a href="#features">Features</a>
    <a href="#how-it-works">How It Works</a>
    <a href="#pricing">Pricing</a>
  </div>

  <div class="header-buttons">
    <button class="btn-login">Login</button>
    <button class="btn-signup">Sign Up</button>
  </div>
</div>   
}


export  default Header;
import React from "react";
import { Link } from "react-router-dom";


function Header(){

    return <div className="header"> 
  <Link to="/"><div className="header-logo">Wishlist</div></Link>
  <div className="header-nav">
    <Link to="#features">Features</Link>
    <Link to="#how-it-works">How It Works</Link>
    <Link to="#pricing">Pricing</Link>
  </div>

  <div className="header-buttons">
    <Link to="/Login" className="btn-login">
          login
        </Link>
    {/* <button className="btn-login">Login</button> */}
    <button className="btn-signup">Sign Up</button>
  </div>
</div>   
}


export  default Header;
import React from "react";
import { Link } from "react-router-dom";


function Header(){

    return <div className="header"> 
 <div className="header-logo">
  <Link to="/">Wishlist</Link> </div>
  <div className="header-nav">
    <Link to="#">Get started</Link>
      <Link to="/Create">Create</Link>
      <Link to="/read">Gallery</Link>
  </div>

  <div className="header-buttons">
    <Link to="/Login" className="btn-login">
        <b> login  </b>  
        </Link>
        <Link to="/SignUp"><button className="btn-signup"> Sign Up</button></Link>
   
  </div>
</div>   
}


export  default Header;
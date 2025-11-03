import React,{useState} from "react";


function Home(){
    
    const [value , setValue]=useState("Create");

    
   
    return <div>
         <h1>{value } Your Prefect Wishlist  </h1>
         <img src="/wishlist.png" alt="list" />
    </div>
}
export default Home;
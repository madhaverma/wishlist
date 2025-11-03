import React from "react";

function Footer(){
        const d = new Date();
        let year = d.getFullYear();
    return <div>
        <h3>@{year}wishlist .All rights reserved</h3>
    </div>
}


export default Footer;
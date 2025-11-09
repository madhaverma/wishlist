import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './Home';
import Login from './Login';

function App() {

return (
<Router>
    <Header />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/Login" element={<Login />} />
    </Routes>
    <Footer />
</Router>
)
}

export default App

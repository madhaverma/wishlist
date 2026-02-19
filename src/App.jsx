import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './Home';
import Login from './Login';
import InputForm from './InputForm';
import Gallery from './Gallery';
import SignUp from './SignUp';

function App() {

return (
<Router>
    <Header />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/create" element={<InputForm />} /> 
        <Route path="/Login" element={<Login />} />
        <Route path="/read" element={<Gallery />} /> 
        <Route path="/SignUp" element={<SignUp/>} /> 
    </Routes>
    <Footer />
</Router>
)
}

export default App

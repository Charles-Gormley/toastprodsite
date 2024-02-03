import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/TTLogo.png'; // Adjust the path based on your project structure

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/configure">Generate Podcast</Link>
        {/* Add other links as needed */}
      </div>
    </nav>
  );
};

export default Navbar;

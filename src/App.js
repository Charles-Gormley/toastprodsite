import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home'; // Your home landing page component
import Configure from './Configure'; // Your configuration page component
import logo from './TTLogo.png'
import './App.css';


function App() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar">
            <img src={logo} alt="Logo" className="logo" />
            <div className="menu">
              <Link to="/">Home</Link>
              <Link to="/configure">Generate Podcast</Link>
              {/* Add other links as needed */}
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/configure" element={<Configure />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
    );
}

export default App;

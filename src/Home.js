import React from 'react';
import { Link } from 'react-router-dom';
import SpinningModel from './SpinningModel';

function Home() {
  return (
    <div className="home">
      <div className="content">
        <div className="title-description">
          <div className="home-title">
            <h1 className="big-title">The Future of News is here</h1>
          </div>
          <div className="home-description">
            <p>Experience AI Curated Podcasts at your fingertips. Only hear about stories you actually care about, without the bias, in the most entertaining way there is.</p>
          </div>
        </div>
        <SpinningModel />
      </div>
        {/* Marketing section */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '500px' }}>
          <div style={{ flex: 1, padding: '0 20px' }}>
            <h2>Create a Content at Anytime</h2>
            <p>Never miss out on breaking stories. Generate content about news stories that happened in last few hours and understand ALL perspectives surrounding the story.</p>
          </div>
          <div style={{ flex: 1, padding: '0 20px' }}>
            <h2>Its Free</h2>
            <p>Our free ad supported tier allows you to create 5 minute newsletters specifically tailored to your interests.</p>
          </div>
          <div style={{ flex: 1, padding: '0 20px' }}>
            <h2>Unbiased News</h2>
            <p>Experience news that can mathematically strip out all bias and allow you to hear all sides an easy to digest format.</p>
          </div>
        </div>
      
    </div>
  );
}

export default Home;

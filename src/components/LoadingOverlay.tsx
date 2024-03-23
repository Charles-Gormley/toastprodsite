import Image from 'next/image';
import eggLoading from '../../public/loadingToaster.gif';
import React, { useState, useEffect } from 'react';

const LoadingOverlay: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  const estimatedTime = 12000; // seconds
  const increment = estimatedTime/100;

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the progress by approximately 8.25% every second to reach 99% in 12 seconds
      if (progress < 99) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }, increment);

    // After 12 seconds, clear the interval and set progress to 99%
    setTimeout(() => {
      clearInterval(interval);
      setProgress(99);
    }, estimatedTime);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <p>Generating Your Podcast!</p>
      <div
        style={{
          width: '200px', // Adjust the width as needed
          height: '20px', // Adjust the height as needed
          backgroundColor: '#fff',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#F6C546', // Change color to amber-300
          }}
        />
      </div>
      <span
        style={{
          marginTop: '10px', // Adjust spacing between progress bar and percentage
          fontSize: '14px',
          color: '#fff',
        }}
      >
        {`${progress}%`}
      </span>
      <Image src={eggLoading} alt="Loading..." />
    </div>
  );
};

export default LoadingOverlay;
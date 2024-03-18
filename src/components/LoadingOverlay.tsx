import Image from 'next/image';
import eggLoading from '../../public/loadingToaster.gif'
import React, { useState, useEffect } from 'react';

const LoadingOverlay: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
      const interval = setInterval(() => {
        // Increment the progress by approximately 8.25% every second to reach 99% in 12 seconds
        if (progress < 99) {
          setProgress((prevProgress) => prevProgress + 8.25);
        }
      }, 1000);

      // After 12 seconds, clear the interval and set progress to 99%
      setTimeout(() => {
        clearInterval(interval);
        setProgress(99);
      }, 12000);

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
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
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
              backgroundColor: '#007bff', // Adjust the color as needed
            }}
          />
        </div>
        <Image src={eggLoading} alt="Loading..." />
      </div>
    );
};
  
export default LoadingOverlay;

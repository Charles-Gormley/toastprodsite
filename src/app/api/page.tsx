"use client"

import React, { useState } from 'react';

const ExampleComponent = () => {
  const [accessCode, setAccessCode] = useState('');
  // Assuming you have a state to manage error messages
  // Initialize it here if you need to validate the access code and show error feedback
  const [matchPasswordErrMessage, setMatchPasswordErrMessage] = useState('');

  const fetchData = async () => {
    const url = 'https://k4pb7ngegvtmqlvzfb2rj6zujm0jlbbt.lambda-url.us-east-1.on.aws/';
    const params = new URLSearchParams({
      accessToken: accessCode,
      email: '123@test.com',
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (response.ok) {
        console.log(`Access Code ${accessCode} is valid!`);
        const data = await response.text(); // or response.json() if the response is JSON
        console.log(data);
        // Reset error message if the fetch is successful
        setMatchPasswordErrMessage('');
      } else {
        console.log('Response not successful:', response.statusText);
        // Set error message based on response, if needed
        setMatchPasswordErrMessage('Invalid access code or server error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set or update error message based on caught error
      setMatchPasswordErrMessage('Network or server error');
    }
  };

  return (
    <div>
      <input
        className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${matchPasswordErrMessage && "border-red-500"}`}
        type="text"
        placeholder="Enter Access Token"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
        required
      />
      {matchPasswordErrMessage && (
        <p className="text-red-500 text-xs italic">{matchPasswordErrMessage}</p>
      )}
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default ExampleComponent;

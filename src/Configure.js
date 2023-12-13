import React, { useState } from 'react';
import logo from './TTLogo.png';

function Configure() {
    var [format, setFormat] = useState('Podcast');
    var [newsletterLength, setNewsletterLength] = useState(5); // Minutes
    var [opinionConfrontations, setOpinionConfrontations] = useState(1); // List of opinions
    var [characters, setCharacters] = useState(1); // List of characters
    var [tone, setTone] = useState('Business Casual'); // List of Tones
    var [selectedTopics, setSelectedTopics] = useState([]);
    var [advancedTopics, setAdvancedTopics] = useState([]);
    var [currentInput, setCurrentInput] = useState('');
    var [recency, setRecency] = useState(15);
    var [timePerArticle, setTimePerArticle] = useState(65); // Default to 30 seconds
    var [podcastLength, setPodcastLength] = useState(5); // Default to 5 minutes
    var [response, setResponse] = useState(null);
    var [audioUrl, setAudioUrl] = useState(null);
    var [showAlert, setShowAlert] = useState(false);
    var [isLoading, setIsLoading] = useState(false);
    var apiUrl = "https://wtdwne90ug.execute-api.us-east-1.amazonaws.com/Prod/create-podcast"

    function fetchWithTimeout(url, timeout = 5000) {
      return Promise.race([
          fetch(url),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
      ]);
  }
  
  async function fetchWavFileWithPolling(fileUrl, pollingInterval = 1000, maxAttempts = 500) {
      let attempts = 0;
      
  
      const checkFile = async () => {
          try {
              console.log(`Attempt ${attempts}: Trying to fetch the file...`);
              const response = await fetchWithTimeout(fileUrl, 5000); // 5-second timeout for each fetch
  
              if (response.ok) {
                  
                  // File exists, proceed to download or play
                  const blob = await response.blob();
                  const blobUrl = URL.createObjectURL(blob);
                  setAudioUrl(blobUrl); // Update the audioUrl state
                  console.log("Successful");
                  setIsLoading(false);
              } else {
                  attempts++;
                  console.log(`File not found, retrying... (Attempt ${attempts})`);
                  if (attempts < maxAttempts) {
                      setTimeout(checkFile, pollingInterval);
                  } else {
                      throw new Error(`File not found after ${maxAttempts} attempts`);
                  }
              }
          } catch (error) {
              console.error('Error fetching WAV file:', error);
          }
      };
  
      checkFile();
  }
  

    // Function to handle form submission
    const handleSubmit = async () => {
      if (selectedTopics.length === 0 && advancedTopics.length === 0) {
        setShowAlert(true);
        return;
      }d
      setIsLoading(true);
      setShowAlert(false);

      let basicTopics = selectedTopics;
      let length = podcastLength;

      timePerArticle = parseInt(timePerArticle);
      recency = parseInt(recency);
      length = parseInt(length);

      const dateSinceDay = Math.floor(recency / 24);
      const dateSinceHour = recency % 24;

      const userId = 12345; 

      const formData = {
          format,
          length,
          opinionConfrontations,
          characters,
          tone,
          basicTopics,
          advancedTopics,
          dateSinceDay,
          dateSinceHour,
          timePerArticle,
          userId
      };

      console.log('Form Data:', formData);

      // Convert form data to JSON
      const jsonData = JSON.stringify(formData);
      
      try {
        // Simulating cURL request using fetch API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        });

        const result = await response.json();
        setResponse(result); // Save the result
        console.log('Response:', result);
        
        
        if (result.s3Path) {
          var s3URL = "https://user-podcasts.s3.amazonaws.com/" + result.s3Path;
          fetchWavFileWithPolling(s3URL);
        }

    } catch (error) {
        console.error('Error in request:', error);
    }
};



  const availableTopics = ['politics 🏛️', 'technology⚙️', 'finance 💵', 'science🧪', 'health⚕️', 'environment🌴'];
  const handleTopicSelection = (topic) => {
    setSelectedTopics(prevTopics =>
        prevTopics.includes(topic) 
            ? prevTopics.filter(t => t !== topic) 
            : [...prevTopics, topic]
    );
};
const handleInputChange = (e) => {
  setCurrentInput(e.target.value);
};

const handleKeyPress = (e) => {
  if (e.key === 'Enter' && currentInput) {
      setAdvancedTopics([...advancedTopics, currentInput]);
      setCurrentInput(''); // Reset input field
  }
};

const availableTones = ['Business Casual', 'Informative', 'Casual', 'Formal', 'Friendly', "Sarcastic"];

const handleToneSelection = (selectedTone) => {
  setTone(selectedTone);
};

const removeTopic = (topicToRemove) => {
  setAdvancedTopics(advancedTopics.filter(topic => topic !== topicToRemove));
};

    return (
        <div className="ConfigurationForm">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Generate a Podcast!</h1>

                <div className="controls">
                    <div className="format-selection">
                        <label>Format:</label>
                        <select value={format} onChange={e => setFormat(e.target.value)}>

                            <option value="Podcast">Podcast</option>
                        </select>
                    </div>

                    

                    {format === 'Podcast' && (
                        <div className="podcast-options">
                            {/* <label>Length (Listening Time):</label>
                            <input
                                type="range"
                                min="1"
                                max="60"
                                value={podcastLength}
                                onChange={e => setPodcastLength(e.target.value)}
                            />
                            <span>{podcastLength} minutes</span>
                            <label>Characters:</label>
                            <select value={characters} onChange={e => setCharacters(e.target.value)}>
                                <option value="1">1 Character</option>
                                <option value="2">2 Characters</option>
                                <option value="3">3 Characters</option>
                            </select> */}
                        </div>
                    )}

                    <div className="topics-container">
                                    <label>Basic Topics:</label>
                                    <div className="topics-grid">
                                        {availableTopics.map(topic => (
                                            <button
                                                key={topic}
                                                className={`topic-button ${selectedTopics.includes(topic) ? 'selected' : ''}`}
                                                onClick={() => handleTopicSelection(topic)}
                                            >
                                                {topic}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="option">
                <label>Advanced Topics:</label>
                <input
                    type="text"
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter your own topics and press Enter. The more words you have the better your query is!!!"
                />
                <div className="advanced-topics-list">
                    {advancedTopics.map((topic, index) => (
                        <div key={index} className="advanced-topic">
                            {topic} <button onClick={() => removeTopic(topic)}>X</button>
                        </div>
                    ))}
                </div>
            </div>

                    <div className="option">
                        <label>Recency (Content Summary Hours):</label>
                        <input
                            type="range"
                            min="2"
                            max="96"
                            value={recency}
                            onChange={e => setRecency(e.target.value)}
                        />
                        <p>{recency} hour(s)</p>
                    </div>

                    <div className="tone-container">
                        <label>Tone:</label>
                        <div className="tones-grid">
                            {availableTones.map(toneOption => (
                                <button
                                    key={toneOption}
                                    className={`tone-button ${tone === toneOption ? 'selected' : ''}`}
                                    onClick={() => handleToneSelection(toneOption)}
                                >
                                    {toneOption}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="option">
                      <label>Time per Article (seconds):</label>
                      <input
                          type="range"
                          min="30"
                          max="240"
                          value={timePerArticle}
                          onChange={e => setTimePerArticle(e.target.value)}
                      />
                      <p>{timePerArticle} seconds</p>
                  </div>

                  <div className="option">
                      <label>Length of the Podcast (minutes):</label>
                      <input
                          type="range"
                          min="3"
                          max="15"
                          value={podcastLength}
                          onChange={e => setPodcastLength(e.target.value)}
                      />
                      <p>{podcastLength} minutes</p>
                  </div>

                    <div className="submit-container">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </header>
            
  
    
            {showAlert && (
                <div style={{
                  backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red background with opacity
                  
                  color: 'white',
                  textAlign: 'center',
                  border: '2px solid red', // Red border
                  position: 'fixed', // Fixed position
                  top: '0', // At the top of the page
                  left: '0', // Align to the left
                  width: '100%', // Full width
                  zIndex: '1000' // Ensure it's on top of other elements
                }}>
                  Please select at least one topic before submitting.
                </div>
              )}


              {audioUrl && !isLoading && (
                      <div style={{
                          position: 'fixed',
                          bottom: 0,
                          width: '100%',
                          backgroundColor: '#f0f0f0', // Example background color
                          padding: '10px 0', // Some padding
                          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)' // Optional shadow effect
                      }}>
                          <audio controls style={{ width: '100%' }}>
                              <source src={audioUrl} type="audio/wav" />
                              Your browser does not support the audio element.
                          </audio>
                      </div>
                  )}

              {isLoading && (
                      <div style={{
                          position: 'fixed',
                          bottom: 0,
                          width: '100%',
                          backgroundColor: '#fafafa', // Example background color
                          padding: '10px 0', // Some padding
                          height: '30px',
                          textAlign: 'center', // Center the text
                          fontSize: '16px', // Adjust font size as needed
                      }}>
                          Podcast is cooking🍳. Typically takes about a minute<span className="loadingDots"></span> 
                      </div>
                  )}

            
        </div>
    );
}

export default Configure;

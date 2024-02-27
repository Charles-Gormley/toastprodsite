'use client'
import { on } from "events";
import React, { useState, KeyboardEvent } from 'react';
import { useRouter } from "next/navigation";

// Import cookie
import { getCookie, setCookie } from "/src/components/cookies.tsx";

// TODO: Have an audio preview for the tts voices.
// TODO: Create Voice Cards for the different voices.
// TODO: Loading Toast while waiting for the response from the server.

const basicTopics = [
  "Finance 💰",
  "Politics 🏛️",
  "Health 💊",
  "Research 🔬",
  "Technology 💻",
  "Legal ⚖️",
  "Business 🏢",
  "Geopolitics 🌐",
];


const tones = [
  "Business Casual",
  "Informative",
  "Casual",
  "Formal",
  "Friendly",
  "Sarcastic",
];

const hosts = ["Carl", "Luna"];

interface TopicButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const TopicButton: React.FC<TopicButtonProps> = ({ label, onClick, isSelected }) => {
  // Use useState to manage hover state
  const [isHovered, setIsHovered] = useState(false);
  
  // Define styles including hover effects
  const baseStyle = {
    transition: 'all 0.3s ease-in-out', // Transition for smooth effects
  };

  const selectedStyle = {
    ...baseStyle,
    backgroundColor: isHovered ? '#EFEFEF' : '#FFFFFF', // Change color on hover
    color: 'black',
    boxShadow: '0px 4px 6px rgba(253, 207, 91, 1)',
  };

  const unselectedStyle = {
    ...baseStyle,
    backgroundColor: isHovered ? '#E0E0E0' : '#FAFAFA', // Slightly darker on hover for unselected
    color: 'black',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  };

  const buttonStyle = isSelected ? selectedStyle : unselectedStyle;

  return (
    <button
      type="button"
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="font-semibold py-2 px-4 rounded inline-flex items-center mr-2 mb-2 focus:outline-none focus:shadow-outline"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const NewsInterests: React.FC<{}> = () => {
  // Initialize selectedTopics as an empty array
  const [selectedBasicTopics, setSelectedBasicTopics] = useState<string[]>([]);
  const [advancedTopics, setAdvancedTopics] = useState<string[]>([]);
  const [currentAdvancedTopic, setCurrentAdvancedTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('');
  const [selectedHost, setSelectedHost] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const router = useRouter();


  // Adjust the submit button style
  const submitButtonStyle = {
    backgroundColor: isSubmitHovered ? '#E0E0E0' : '#fafafa', // Darker on hover
    color: 'black',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '4px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0px 5px 6px rgba(0, 0, 0, .2)',
  };


  const handleSubmitButtonClick = async () => {
    const url = 'https://api.tokenizedtoast.com/podcast-recommendation';

    // Check to make sure there is a topic (either basic or advanced), a tone, a host. give a specific error for each. 
    if (selectedBasicTopics.length === 0 && advancedTopics.length === 0) {
      setError('Please select at least one topic.');
      return;
    }
    // Check that a tone is selected
    if (selectedTone === '') {
      setError('Please select a tone.');
      return;
    }
    // Check that a host is selected
    if (selectedHost === '') {
      setError('Please select a host.');
      return;
    }
    
    // Get the jwt.
    const jwt = getCookie('jwt-token');

    // Get user's email address 
    const email = getCookie('email');

    // Create payload for the api call
    const headers = {"Content-Type": "application/json"};
    const payload = {"email": email, 
                     "jwt": jwt, 
                     "basic_topics": selectedBasicTopics, 
                     "advanced_topics": advancedTopics, 
                     "character": selectedHost, 
                     "tone": selectedTone};
    console.log('payload', payload);

    setCookie('character', selectedHost);
    setCookie('tone', selectedTone);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('You are an unathorized user. Please login or create an account :)');
        }
        else if (response.status === 403 || response.status === 404) {
          setError("Hmmm. seems like you haven'nt logged in for awhile or your session has expired. Please login again to enjoy the best podcasts on earth.");
        }
        else if (response.status >= 500) {
          setError("We are having some issues right now :( Please try again later. We'll email you when we're back up and running.");
        }
        else {
          setError('An error occurred. Please try again later.');
        }
      }

      if (response.ok) {
        const jsonResponse = await response.json(); 
        console.log('response', jsonResponse);
        
        router.push('/podcast_player')
      }
    }
  catch (error) {
    console.error('Error:', error);
  }
};

  const handleBasicTopicClick = (topic: string) => {
      console.log('topic', topic);
      // Check if the topic is already selected
      if (selectedBasicTopics.includes(topic)) {
        // If it is, remove it from the array and return the new array
        setSelectedBasicTopics(selectedBasicTopics.filter(t => t !== topic));

      } else {
        // If it's not, add it to the array and return the new array
        setSelectedBasicTopics([...selectedBasicTopics, topic]);
      }
    };

  const handleToneChoiceClick = (tone: string) => {
    setSelectedTone(tone);
  }

  const handleHostChoiceClick = (host: string) => {
    setSelectedHost(host);
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission or other default action
      const topicWords = currentAdvancedTopic.trim().split(/\s+/);
      if (topicWords.length < 5) {
        setError('Each advanced topic must be 5 or more words.');
      } else {
        setError(''); // Clear error message
        setAdvancedTopics(prevTopics => [...prevTopics, currentAdvancedTopic]);
        setCurrentAdvancedTopic(''); // Clear the input field
      }
    }
  };

  // Function to remove a specific advanced topic
  const removeAdvancedTopic = (indexToRemove: number) => {
    setAdvancedTopics(advancedTopics.filter((_, index) => index !== indexToRemove));
  };



  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error && (
        <div style={{ backgroundColor: 'red', padding: '10px', marginBottom: '20px', borderRadius: '5px', color: '#000' }}>
          {error}
        </div>
      )}
      <h1 className="text-4xl font-bold text-center mb-6">
        Generate a Podcast
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Basic Topics</h2>
        <div className="flex flex-wrap justify-center">
          {basicTopics.map((topic: string) => (
            <TopicButton
              key={topic}
              label={topic}
              onClick={() => { handleBasicTopicClick(topic); }}
              isSelected={selectedBasicTopics.includes(topic)}
            />
          ))}
        </div>
      </section>

      <section className="mb-6 w-full md:w-3/4 xl:w-1/2 mx-auto">
      <h3 className="text-md font-semibold mb-2">Advanced Topics</h3>
        {/* Wrap the input in a div for centering */}
        <div className="flex justify-center items-center w-full">
          <input
            style={{ width: '100%' }}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your own topics. Then Press enter. Each topic should be 5 or more words"
            value={currentAdvancedTopic}
            onChange={(e) => setCurrentAdvancedTopic(e.target.value)}
            onKeyDown={handleKeyPress}
            // Adjusted style for advanced topics
          />
        </div>
        {/* Display the advanced topics as removable blocks */}
        <div className="mt-4">
          {advancedTopics.map((topic, index) => (
            <div
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF', // Light background color similar to unselectedStyle
                color: 'black', // Text color to match the x button or adjusted as per the new theme
                margin: '4px',
                padding: '6px 12px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(253, 207, 91, 1)', // Soft shadow for depth
              }}
            >
              {topic}
              <button
                style={{
                  marginLeft: '8px',
                  backgroundColor: '#FFFFFF', // Bright attention-grabbing color
                  color: '#7D7D7D',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
                onClick={() => removeAdvancedTopic(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>

      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Tone</h2>
        <div className="flex flex-wrap justify-center">
          {tones.map((tone) => (
            <TopicButton
              key={tone}
              label={tone}
              onClick={() => { handleToneChoiceClick(tone); }}
              isSelected={selectedTone === tone}
            />
          ))}
        </div>
      </section>

      {/* <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Number of Segments</h2>
        <input
          type="range"
          min={0}
          max={6}
          className="range"
          step="1"
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div>
      </section> */}

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Choose your Host:</h2>
        <div className="flex flex-wrap justify-center">
          {hosts.map((host) => (
            <TopicButton
              key={host}
              label={host}
              onClick={() => { handleHostChoiceClick(host); }}
              isSelected={selectedHost === host}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-6">
      <button
          type="submit"
          style={submitButtonStyle}
          onMouseEnter={() => setIsSubmitHovered(true)}
          onMouseLeave={() => setIsSubmitHovered(false)}
          onClick={handleSubmitButtonClick}
      >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewsInterests;

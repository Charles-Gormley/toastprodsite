// use client component
//   );
export const useClient = true;

import { on } from "events";
import React, { useState, KeyboardEvent } from 'react';




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

const hosts = ["Carl", "Laura"];

const predefinedValues = ["test", "hi", "bye"];

interface TopicButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const TopicButton: React.FC<TopicButtonProps> = ({ label, onClick, isSelected }) => {
  const selectedClass = isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700';

  return (
    <button
      type="button"
      className={`btn ${selectedClass} font-semibold py-2 px-4 rounded inline-flex items-center mr-2 mb-2 focus:outline-none focus:shadow-outline hover:bg-gray-300`}
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


  const handleBasicTopicClick = (topic: string) => {
      console.log('topic', topic);
      // Check if the topic is already selected
      if (selectedBasicTopics.includes(topic)) {
        // If it is, remove it from the array and return the new array
        return selectedBasicTopics.filter(t => t !== topic);
      } else {
        // If it's not, add it to the array and return the new array
        return [...selectedBasicTopics, topic];
      }
    };

  const handleToneChoiceClick = (tone: string) => {
    setSelectedTone(tone);
  }

  const handleHostChoiceClick = (host: string) => {
    setSelectedHost(host);
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && currentAdvancedTopic.trim() !== '') {
      event.preventDefault(); // Prevent form submission or other default action
      setAdvancedTopics(prevTopics => [...prevTopics, currentAdvancedTopic]);
      setCurrentAdvancedTopic(''); // Clear the input field
    }
  };

  // Function to remove a specific advanced topic
  const removeAdvancedTopic = (indexToRemove: number) => {
    setAdvancedTopics(advancedTopics.filter((_, index) => index !== indexToRemove));
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">
        Generate a Podcast
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Basic Topics</h2>
        <div className="flex flex-wrap justify-center">
          {basicTopics.map((topic: string) => (
            <TopicButton key={topic} label={topic} onClick={() => { handleBasicTopicClick(topic); }} isSelected={true} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-md font-semibold mb-2">Advanced Topics</h3>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          type="text"
          placeholder="Enter your own topics and press Enter."
          value={currentAdvancedTopic}
          onChange={(e) => setCurrentAdvancedTopic(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {/* Display the advanced topics as removable blocks */}
        <div className="mt-4">
          {advancedTopics.map((topic, index) => (
            <div key={index} className="inline-flex items-center bg-gray-200 text-gray-700 m-1 p-2 rounded">
              {topic}
              <button
                className="ml-2 bg-red-500 text-white p-1 rounded hover:bg-red-700"
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
            <TopicButton key={tone} label={tone} onClick={() => { handleToneChoiceClick(tone); }} isSelected={true} />
          ))}
        </div>
      </section>

      <section className="mb-6">
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
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Choose your Host:</h2>
        <div className="flex flex-wrap justify-center">
          {hosts.map((host) => (
            <TopicButton key={host} label={host} onClick={() => { handleHostChoiceClick(host); }} isSelected={true} />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="btn bg-blue-500 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewsInterests;

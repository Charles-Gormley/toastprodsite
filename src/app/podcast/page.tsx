import React from "react";

type TopicButtonProps = {
  label: string;
};

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

const TopicButton: React.FC<TopicButtonProps> = ({ label }) => {
  return (
    <button
      type="button"
      className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center mr-2 mb-2 focus:outline-none focus:shadow-outline hover:bg-gray-300"
    >
      {label}
    </button>
  );
};

const NewsInterests: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">
        Generate a Podcast
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">News Interests</h2>
        <div className="flex flex-wrap justify-center">
          {basicTopics.map((topic) => (
            <TopicButton key={topic} label={topic} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-md font-semibold mb-2">Advanced Topics</h3>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          type="text"
          placeholder="Enter your own topics and press Enter."
        />
        <p className="text-gray-600 text-xs mt-2 text-center">
          The more words you have the better the prediction.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Tone</h2>
        <div className="flex flex-wrap justify-center">
          {tones.map((tone) => (
            <TopicButton key={tone} label={tone} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Number of Segments</h2>
        <input
          type="range"
          min={0}
          max={7}
          value="1"
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
            <TopicButton key={host} label={host} />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewsInterests;

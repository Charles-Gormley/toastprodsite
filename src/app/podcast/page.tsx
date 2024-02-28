"use client";
import { on } from "events";
import React, { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

// Import cookie
import { getCookie, setCookie } from "../../components/cookies";
import LoadingOverlay from "../../components/LoadingOverlay";

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

const basicTopicDict = {
  "Finance 💰":
    "macroeconomics, microeconomics, savings, stocks, bonds, inflation, interest rates, monetary policy, fiscal policy, exchange rates, GDP, unemployment rate, public debt, balance of payments, financial markets, investment, capital flows, economic growth, recession, deflation, central banking, financial regulation, asset management, risk management, currency, commodities, derivatives, financial planning, taxation",
  "Politics 🏛️":
    "democracy, autocracy, socialism, capitalism, communism, federalism, anarchism, oligarchy, nationalism, liberalism, conservatism, populism, totalitarianism, diplomacy, geopolitics, electoral system, political party, civil rights, legislation, executive branch, legislative branch, judicial branch, constitution, separation of powers, checks and balances, public policy, political campaign, international relations, human rights, governance, political economy, lobbying, activism, referendum, treaty, political ideology, political philosophy, state sovereignty, political science, voting system, political culture, political corruption, civil society",
  "Health 💊":
    "nutrition, mental health, exercise and fitness, chronic diseases, infectious diseases, preventive healthcare, public health policy, healthcare systems, medical ethics, epidemiology, vaccination, mental disorders, stress management, occupational health, environmental health, sexual health, substance abuse, health education, alternative medicine, pediatrics, geriatrics, women's health, men's health, global health issues, telemedicine, health informatics, nutrition and dietetics, surgical procedures, pharmacology, physical therapy, dental health, dermatology, cardiology, oncology, neurology, psychiatry, obstetrics and gynecology, endocrinology, immunology, health insurance, health disparities, pandemic response, first aid and emergency care, reproductive health, health and wellness technology",
  "Research 🔬":
    "Artificial Intelligence and Machine Learning, Quantum Computing, Sustainable Energy Technologies, Biotechnology and Genetic Engineering, Nanotechnology, Environmental Science and Climate Change, Robotics and Automation, Data Science, Big Data Analytics, Cybersecurity and Information Security, Materials Science and Engineering, Aerospace Engineering, Neuroscience and Brain-Computer Interfaces, 3D Printing, Additive Manufacturing, Theoretical Physics and Cosmology, Chemical Engineering, Renewable Energy Sources and Storage, Bioinformatics and Computational Biology, Virtual Reality (VR) and Augmented Reality (AR), Internet of Things (IoT) and Smart Technologies, Stem Cell Research and Regenerative Medicine, Marine Biology and Oceanography, Geospatial Technologies and Remote Sensing, Astrophysics and Space Exploration, Mechanical Engineering and Dynamics, Agricultural Sciences and Food Security, Earthquake Engineering and Seismic Risk Reduction, Pharmacology and Drug Discovery, Mathematical Modeling and Simulation, Biochemistry and Molecular Biology, Civil Engineering and Infrastructure Resilience, Wireless Communications and Networking, Environmental Health and Toxicology, Cognitive Science, Meteorology, Water Resources Engineering, Optics and Photonics, Epidemiology and Public Health, Genomics, Personalized Medicine, Clean Technology, Digital Humanities",
  "Technology 💻":
    "Cloud Computing, Cybersecurity and Ethical Hacking, Data Science and Analytics, Artificial Intelligence and Machine Learning, Blockchain Technology, Internet of Things (IoT), Augmented Reality (AR) and Virtual Reality (VR), Software Development Methodologies, Mobile App Development, Web Development Technologies, Quantum Computing, User Experience (UX) and User Interface (UI) Design, Networking and Communications, Big Data Technologies, Robotics and Automation, 3D Printing and Additive Manufacturing, Wearable Technology, Smart Home Technologies, Digital Marketing and SEO, E-commerce Platforms and Technologies, Game Development and Design, Database Management Systems, Computer Graphics and Animation, Cyber-Physical Systems, Voice and Speech Recognition Technologies, Energy-Efficient Computing, Biometric Technology, Edge Computing, Open Source Software and Development, Information Security and Privacy, Computer Vision and Pattern Recognition, Distributed Systems and Computing, Fintech and Financial Technologies, Healthcare IT and Telemedicine, Educational Technology and E-learning, Green Technology and Sustainability in IT, Autonomous Vehicles and Drones, Social Media Technologies and Trends, Digital Transformation Strategies, High-Performance Computing, Nanotechnology, Technology Policy and Ethics",
  "Business 🏢":
    "Business Strategy and Planning, Marketing Strategies and Consumer Behavior, Financial Management and Accounting, Human Resources Management, Operations Management, Supply Chain and Logistics, Entrepreneurship and Startup Culture, International Business and Global Markets, Business Ethics and Corporate Social Responsibility, E-commerce and Digital Business, Innovation and Product Development, Project Management, Leadership and Organizational Behavior, Management Information Systems, Business Analytics and Data Analysis, Customer Relationship Management, Corporate Finance and Investment, Risk Management and Insurance, Real Estate and Property Management, Sales and Business Development, Business Law and Legal Issues, Corporate Governance, Public Relations and Corporate Communication, Brand Management and Branding Strategies, Sustainable Business Practices and Green Business, Small Business Management and SMEs, Negotiation and Conflict Resolution, Business Intelligence and Competitive Analysis, Retail Management and Merchandising, Family Business Management, Business Education and Training, Franchising and Chain Store Operations, Event Management and Event Planning, Hospitality Management and Tourism, Healthcare Management, Nonprofit Organizations and Social Enterprise, Business Process Outsourcing, Mergers and Acquisitions, Private Equity and Venture Capital, Corporate Restructuring and Turnaround, International Trade and Export, Crisis Management, Intellectual Property in Business, Fintech and Financial Technologies, Agribusiness and Food Industry Management, Sports Management, Entertainment and Media Management, Technology Management, Public Sector Management and Government Business Relations",
  "Legal ⚖️":
    "Constitutional Law, Criminal Law, Civil Rights, Corporate Law, Intellectual Property Rights, Labor and Employment Law, Environmental Law, Family Law, Real Estate Law, Tax Law, Contract Law, Tort Law, International Law, Administrative Law, Securities Law, Bankruptcy Law, Immigration Law, Health Law, Education Law, Estate Planning and Probate, Antitrust Law, Competition Law, Consumer Protection Law, Cyber Law and Internet Regulation, Human Rights Law, Insurance Law, Maritime Law, Sports Law, Entertainment Law, Legal Ethics and Professional Responsibility, Dispute Resolution and Arbitration, Litigation, Criminal Procedure, Evidence Law, Legal Theory and Jurisprudence, Comparative Law, Legal History, Patent Law, Trademark Law, Copyright Law, Trade Secret Law, Product Liability Law, Public International Law, Private International Law, Space Law, Animal Law, Energy Law, Food and Drug Law, Housing Law, Juvenile Law, Military Law, Native American Law, Public Health Law, Transportation Law",
  "Geopolitics 🌐":
    "Global Power Dynamics, International Relations and Diplomacy, Conflict and Peace Studies, Geopolitical Theories and Strategies, Economic Sanctions and Trade Wars, Energy Security and Natural Resources, Territorial Disputes and Border Conflicts, Globalization and its Impacts, Regional Powers and Regional Alliances, Military Strategies and Defense Policies, Intelligence and Cybersecurity, Climate Change and Environmental Politics, Maritime Security and Naval Strategy, Space Politics and Outer Space Treaties, Cultural Diplomacy and Soft Power, Non-State Actors and Transnational Issues, Nuclear Proliferation and Arms Control, Humanitarian Interventions and International Law, Economic Development and Geopolitical Influence, Political Geography and Critical Geopolitics, Cyber Warfare and Information Warfare, Global Governance and International Organizations, Migration and Border Security, Political Economy and Trade Agreements, Democracy and Authoritarianism in World Politics, Terrorism and Counterterrorism Strategies, Propaganda and Media Influence in Geopolitics, Emerging Technologies and Geopolitical Competition, Pandemics and Global Health Security, Geopolitical Risk Analysis and Forecasting, Post-Colonialism and Neo-Colonialism, Geopolitical History and Historical Disputes, Nation-State Building and Nationalism, Ethnic Conflicts and Sectarian Violence, Proxy Wars and Foreign Interventions, Geopolitical Modeling and Simulation, Global Supply Chains and Economic Interdependence, Crisis Management and Conflict Resolution, Political Demography and Population Dynamics, Strategic Resources and Commodities Markets, Geopolitical Education and Analytical Frameworks, International Norms and Global Order",
};

const basicTopicsMap = new Map<string, string> (Object.entries(basicTopicDict));

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

const TopicButton: React.FC<TopicButtonProps> = ({
  label,
  onClick,
  isSelected,
}) => {
  // Use useState to manage hover state
  const [isHovered, setIsHovered] = useState(false);

  // Define styles including hover effects
  const baseStyle = {
    transition: "all 0.3s ease-in-out", // Transition for smooth effects
  };

  const selectedStyle = {
    ...baseStyle,
    backgroundColor: isHovered ? "#EFEFEF" : "#FFFFFF", // Change color on hover
    color: "black",
    boxShadow: "0px 4px 6px rgba(253, 207, 91, 1)",
  };

  const unselectedStyle = {
    ...baseStyle,
    backgroundColor: isHovered ? "#E0E0E0" : "#FAFAFA", // Slightly darker on hover for unselected
    color: "black",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
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
  const [currentAdvancedTopic, setCurrentAdvancedTopic] = useState("");
  const [selectedTone, setSelectedTone] = useState<string>("");
  const [selectedHost, setSelectedHost] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const router = useRouter();

  const [showLoading, setLoading] = useState(false); // RAJA

  // Adjust the submit button style
  const submitButtonStyle = {
    backgroundColor: isSubmitHovered ? "#E0E0E0" : "#fafafa", // Darker on hover
    color: "black",
    fontWeight: "bold",
    padding: "8px 16px",
    borderRadius: "4px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0px 5px 6px rgba(0, 0, 0, .2)",
  };

  const handleSubmitButtonClick = async () => {
    setLoading(true);

    const url = "https://api.tokenizedtoast.com/podcast-recommendation";

    // Check to make sure there is a topic (either basic or advanced), a tone, a host. give a specific error for each.
    if (selectedBasicTopics.length === 0 && advancedTopics.length === 0) {
      setError("Please select at least one topic.");
      return;
    }
    // Check that a tone is selected
    if (selectedTone === "") {
      setError("Please select a tone.");
      return;
    }
    // Check that a host is selected
    if (selectedHost === "") {
      setError("Please select a host.");
      return;
    }

    // Get the jwt.
    const jwt = getCookie("jwt-token");

    // Get user's email address
    const email = getCookie("email");

    // Create payload for the api call
    const headers = { "Content-Type": "application/json" };
    const payload = {
      email: email,
      jwt: jwt,
      basic_topics: selectedBasicTopics,
      advanced_topics: advancedTopics,
      character: selectedHost,
      tone: selectedTone,
    };
    console.log("payload", payload);

    setCookie("character", selectedHost);
    setCookie("tone", selectedTone);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError(
            "You are an unathorized user. Please login or create an account :)"
          );
        } else if (response.status === 403 || response.status === 404) {
          setError(
            "Hmmm. seems like you haven'nt logged in for awhile or your session has expired. Please login again to enjoy the best podcasts on earth."
          );
        } else if (response.status >= 500) {
          setError(
            "We are having some issues right now :( Please try again later. We'll email you when we're back up and running."
          );
        } else {
          setError("An error occurred. Please try again later.");
        }
      }

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("response", jsonResponse);

        router.push("/podcast_player");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBasicTopicClick = (topic: string) => {
    console.log("topic", topic);
    // Check if the topic is already selected
    if (selectedBasicTopics.includes(topic)) {
      // If it is, remove it from the array and return the new array
      setSelectedBasicTopics(selectedBasicTopics.filter((t) => t !== topic));
    } else {
      // If it's not, add it to the array and return the new array
      setSelectedBasicTopics([...selectedBasicTopics, topic]);
    }
  };

  const handleToneChoiceClick = (tone: string) => {
    setSelectedTone(tone);
  };

  const handleHostChoiceClick = (host: string) => {
    setSelectedHost(host);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default action
      const topicWords = currentAdvancedTopic.trim().split(/\s+/);
      if (topicWords.length < 5) {
        setError("Each advanced topic must be 5 or more words.");
      } else {
        setError(""); // Clear error message
        setAdvancedTopics((prevTopics) => [
          ...prevTopics,
          currentAdvancedTopic,
        ]);
        setCurrentAdvancedTopic(""); // Clear the input field
      }
    }
  };

  // Function to remove a specific advanced topic
  const removeAdvancedTopic = (indexToRemove: number) => {
    setAdvancedTopics(
      advancedTopics.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error && (
        <div
          style={{
            backgroundColor: "red",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            color: "#000",
          }}
        >
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
              onClick={() => {
                handleBasicTopicClick(basicTopicsMap.get(topic) || "");
              }}
              isSelected={selectedBasicTopics.includes(basicTopicsMap.get(topic) || "")}
            />
          ))}
        </div>
      </section>

      <section className="mb-6 w-full md:w-3/4 xl:w-1/2 mx-auto">
        <h3 className="text-md font-semibold mb-2">Advanced Topics</h3>
        {/* Wrap the input in a div for centering */}
        <div className="flex justify-center items-center w-full">
          <input
            style={{ width: "100%" }}
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
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF", // Light background color similar to unselectedStyle
                color: "black", // Text color to match the x button or adjusted as per the new theme
                margin: "4px",
                padding: "6px 12px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(253, 207, 91, 1)", // Soft shadow for depth
              }}
            >
              {topic}
              <button
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#FFFFFF", // Bright attention-grabbing color
                  color: "#7D7D7D",
                  padding: "4px 8px",
                  borderRadius: "4px",
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
              onClick={() => {
                handleToneChoiceClick(tone);
              }}
              isSelected={selectedTone === tone}
            />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Choose your Host:</h2>
        <div className="flex flex-wrap justify-center">
          {hosts.map((host) => (
            <TopicButton
              key={host}
              label={host}
              onClick={() => {
                handleHostChoiceClick(host);
              }}
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
      <div className="flex justify-center mt-6">
        {showLoading && <LoadingOverlay />}
      </div>
    </div>
  );
};

export default NewsInterests;

"use client";
import "@madzadev/audio-player/dist/index.css";
import { getCookie, setCookie } from "/src/components/cookies.tsx";
import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';


// Import Plyr CSS in the component or _app.js
import 'plyr/dist/plyr.css';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Noto_Sans_Tamil_Supplement } from "next/font/google";


// TODO: Complete redesign.(CSS)
// TODO: Better Audio Bar Design.

// TODO: Content Preview
// TODO: Next Podcast Call with the next button being pressed or the next podcasts starting to play.

// Architectural Pattern for the Podcast Player.
// 1. Podcast Recommendation (This is already done)
// 2. Intro Retrieval.
// 3. Podcast Preview Retrieval (Segment 1 & Segment 2)
// Display the podcast preview in the text on the page.
// Display the podcast preview title on the right side vertically, these buttons should just start to appear.

// 4. When intro is done grab the next segment. ( Develop this a linked list of segments.)
// 5. When the next segment is done grab the next segment.

const reverseKeyValuePairs = (inputDict: {
  [key: string]: string;
}): { [key: string]: string } => {
  const reversedMap: { [key: string]: string } = {};

  Object.keys(inputDict).forEach((key) => {
    const value = inputDict[key];
    reversedMap[value] = key;
  });

  return reversedMap;
};

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
  "Advanced Topics":
    "Advanced Topics"
};

const reversedDict = reverseKeyValuePairs(basicTopicDict);

const reversedMap = new Map<string, string>(Object.entries(reversedDict));

const base = "https://api.tokenizedtoast.com/";
const ceilIndex = 100000; // arbitrary large number.
let maxIndex = ceilIndex; // iniitalize maxIndex to the ceilIndex.
let lastSegmentIndex = -1; // last segment index that was played.

// TODO: We need Automatic Next Button

const AudioPlayer: React.FC = () => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [podcastIndex, setPodcastIndex] = useState("intro");
  var [content_preview, setContentPreview] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string>("");

  const audioPlayerRef = useRef(null);
  function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  // const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // Previous Podcast Index
  const previousPodcastIndex = () => {
    if (podcastIndex !== "intro") {
      const newIndex =
        podcastIndex === "0"
          ? "intro"
          : (parseInt(podcastIndex) - 1).toString();
      setPodcastIndex(newIndex);
    }
  };

  async function getPodcastPreview(
    podcastIndex: string
  ): Promise<Record<string, string>> {
    const previewUrl = `${base}podcast-preview/`;
    const email = getCookie("email");
    const jwt = getCookie("jwt-token");

    const payload = {
      email: email, // Ensure this matches your cookie structure
      jwt: jwt,
      podcast_index: podcastIndex,
    };

    try {
      const response = await fetch(previewUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Getting Presigned S3 URL
        const jsonResponse = await response.json();
        console.log("get segment response", jsonResponse);

        const podcastPreview = jsonResponse.podcast_preview;
        return podcastPreview; // {topic, content_preview_title, script, source}
      } else {
        console.error("Failed to load audio");
        return { Status: "Failed" };
        // TODO: Add Error Handling
      }
    } catch {
      console.error("Error fetching audio");
      return { Status: "Failed" };
      // TODO: Add Error Handling
    }
  }

  // promose integer
  async function createNextSegment(curIndex: string): Promise<number> {
    const nextSegUrl = `${base}create-next-segment/`;
    const email = getCookie("email");
    const jwt = getCookie("jwt-token");
    const character = getCookie("character");
    const tone = getCookie("tone");

    const payload = {
      email: email,
      jwt: jwt,
      character: character,
      tone: tone,
    };

    try {
      const nexSegResponse = await fetch(nextSegUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(nexSegResponse + "Next Segment Response");

      if (nexSegResponse.status <= 299){

        return nexSegResponse.status;
      }

      else if (nexSegResponse.status == 429){
        setError("Congrats! You have generated all your podcast segments for the pilot! 🎊🥳💃. You are being redirected to the waitlist at https://tokenizedtoast.com/waitlist in 5 seconds. ")
        
          await sleep(5*1000);
          return 429;
      }
    } catch {
      // Rate Limit Error
      setError("We are experiencing issues. Hold tight! ")
      return 501;
    }
    return 400;
  }

  // Next Podcast Index
  const nextPodcastIndex = () => {
    if (String(podcastIndex) === String(maxIndex)) {
      // If this is the case then we need to error out.
      console.error("Max Index Reached");
      // TODO: Set error here.
      return;
    } else {
      if (podcastIndex === "intro") {
        lastSegmentIndex = 0;
        setPodcastIndex(String(lastSegmentIndex));
      } else {
        if (parseInt(podcastIndex) === lastSegmentIndex) {
          // if the podcastIndex is the last one generated then we can generated the next segment.
          // If the podcast is not the intro try to start generating the next segment.
          lastSegmentIndex += 1;
          setPodcastIndex(String(lastSegmentIndex));

          if (maxIndex === ceilIndex) {
            // Meaning we have found the limit, and we can stop generating new segments.

            const responsePromise = createNextSegment(podcastIndex);
            responsePromise.then((response) => {
              if (response === 429) {
                // We hit the rate limit, stop generating new segments.
                maxIndex = parseInt(podcastIndex) + 2;
                console.log("Rate Limit Hit");
                return;
              }
              if (
                response <= 299 &&
                String(lastSegmentIndex) === podcastIndex
              ) {
              }
            });
          } else {
            if (lastSegmentIndex === maxIndex) {
              console.log("Max Index Reached");
              return;
            }
          }
        } else {
          setPodcastIndex(String(parseInt(podcastIndex) + 1));
          return;
        }
      }
    }
  };

  async function streamAudio(podcastIndex: string) {
    const url = `${base}get-segment-stream`;
    const email = getCookie("email");
    const jwt = getCookie("jwt-token");

    const payload = {
      email: email, // Ensure this matches your cookie structure
      jwt: jwt,
      podcast_index: podcastIndex,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Getting Presigned S3 URL
        const jsonResponse = await response.json();
        console.log("get stream response", jsonResponse);

        const stream_url = jsonResponse.url;
        console.log("url", stream_url);

        if (podcastIndex !== "intro") {
          content_preview = await getPodcastPreview(podcastIndex);
          setContentPreview(content_preview);
        }

        setAudioSrc(stream_url);
      } else {
        console.error("Failed to load audio");
        // Display Error onto the screen.
        // TODO: Add Error Handling
      }
    } catch {
      console.error("Error fetching audio stream");
      // Display Error onto the screen.
    }
  }

  useEffect(() => {
    streamAudio(podcastIndex);
    if (typeof window !== 'undefined' && audioPlayerRef.current !== null) {
      // Dynamically import Plyr here inside useEffect
      import('plyr').then(Plyr => {
        if (audioPlayerRef.current === null) {
          return;
        }

        if (audioPlayerRef.current === null) {
          return;
        }
        
    
        const player = new Plyr.default(audioPlayerRef.current);
  
        // Function to be called when the audio ends
        const handleAudioEnd = () => {
          nextPodcastIndex(); // Assuming this function loads and plays the next segment
        };

  
        // Add event listener for when the audio ends
        
        if (audioPlayerRef.current !== null) {
            if (audioPlayerRef.current) {
              audioPlayerRef.current.addEventListener('ended', handleAudioEnd);
            }
          }
        
  
        // Cleanup function to destroy Plyr instance and remove event listener when component unmounts
        return () => {
          player.destroy();
          if (audioPlayerRef.current !== null) {
            if (audioPlayerRef.current) {
              audioPlayerRef.current.removeEventListener('ended', handleAudioEnd);
            }
          }
        };
      });
    }
  }, [podcastIndex]);

  function splitTextIntoParagraphs(text: string): string[] {
    const regexPattern = /(?<!\b(?:[A-Z]\.){1,}[A-Z]?)\.\s+(?=[A-Z])|\.(?=$)/g;
    const sentences = text.split(regexPattern);

    const paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i += 4) {
      const paragraphSentences = sentences.slice(i, i + 4);

      paragraphs.push(paragraphSentences.join(" "));
    }

    return paragraphs;
  }


  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 lg:px-8">
     
     {error && (
        <div
          style={{
            backgroundColor: "#8B0000",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            color: "#fff",
          }}
        >
          {error}
        </div>
      )}
      <div className="max-w-4xl w-full">
        <p className="inline-block px-3 py-1 border border-gray-300 text-sm text-gray-700 bg-gray-100 rounded-full mb-4">
          {reversedMap.get(content_preview?.topic || "Advanced Topics")}
        </p>
        <h1 className="text-2xl font-semibold text-gray-900 mt-4 mb-4">
          {content_preview?.content_preview_title}
        </h1>
        {splitTextIntoParagraphs(content_preview?.script || "").map((paragraph, index) => (
          <p key={index} className="text-base text-gray-700 mb-8">
            {paragraph}
          </p>
        ))}
        <hr className="my-4 border-gray-300" />
        <p className="text-sm text-gray-500">
          Source:{" "}
          <a
            href={content_preview?.source}
            className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content_preview?.source}
          </a>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          bottom: "10px",
          width: "90%",
          background: "#fff",
        }}
      >
        <div>
          <button onClick={previousPodcastIndex}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
              />
            </svg>
          </button>
        </div>
          <audio
            style={{ width: "80%", margin: "auto" }}
            id="audioPlayer"
            ref={audioPlayerRef}
            autoPlay
            controls
            src={audioSrc ?? ''}
          ></audio>
        <div>
          <button onClick={nextPodcastIndex}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Use useEffect to trigger the audio streaming when the component mounts or when podcastIndex changes

// TODO: We need to do s3 pre-signed urls for the audio files.

export default AudioPlayer;
// Main react function for the podcast player.
//

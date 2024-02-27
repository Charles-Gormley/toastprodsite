"use client"

import MediaButtons from "@/components/MediaButtons";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { getCookie, setCookie } from "/src/components/cookies.tsx";
import { LinkedList } from "/src/components/LinkedList.tsx";

// TODO: Fix Next button, if you click it multiple times it will fail. 


import React, { useEffect, useState, useRef } from 'react';
import { create } from "domain";
import { parse } from "path";

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
// 6. 

const base = "https://api.tokenizedtoast.com/";
const ceilIndex = 100000 // arbitrary large number.
let maxIndex = ceilIndex; // iniitalize maxIndex to the ceilIndex.
let lastSegmentIndex = -1; // last segment index that was played.

// TODO: We need Automatic Next Button


// Audio Player
interface AudioPlayerProps {
  podcastIndex: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [podcastIndex, setPodcastIndex] = useState('intro');
  var [content_preview, setContentPreview] = useState<Record<string, string>  | null>(null);
  
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  // Previous Podcast Index
  const previousPodcastIndex = () => {
    if (podcastIndex !== 'intro') {
      const newIndex = podcastIndex === '0' ? 'intro' : (parseInt(podcastIndex) - 1).toString();
      setPodcastIndex(newIndex);
    }
  };

  async function getPodcastPreview(podcastIndex: string): Promise<Record<string, string>> {
    const previewUrl = `${base}podcast-preview/`;
    const email = getCookie("email");
    const jwt = getCookie("jwt-token");

    const payload = {
      email: email, // Ensure this matches your cookie structure
      jwt: jwt,
      podcast_index: podcastIndex
    };

    try {
      const response = await fetch(previewUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // Getting Presigned S3 URL
        const jsonResponse = await response.json();
        console.log('get segment response', jsonResponse);

        const podcastPreview = jsonResponse.podcast_preview;
        return podcastPreview; // {topic, content_preview_title, script, source}
      }
      else {
        console.error("Failed to load audio");
        return {"Status": "Failed"};
        // TODO: Add Error Handling
      }
    }
    catch {
      console.error("Error fetching audio");
      return {"Status": "Failed"};
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
      tone: tone
    };

    try {
      const nexSegResponse = await fetch(nextSegUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      console.log(nexSegResponse + "Next Segment Response");
      return nexSegResponse.status;
    } catch {
      // Rate Limit Error. // TODO: Rate Limit Bug🪲
      console.error("Error fetching next segment");
      return 429;
    }
  }

  // Next Podcast Index
  const nextPodcastIndex = () => {
    if (String(podcastIndex) === String(maxIndex)) {
      // If this is the case then we need to error out.
      console.error("Max Index Reached");
      // TODO: Set error here. 
      return; 
    }

    else{
      if (podcastIndex === 'intro') {
        lastSegmentIndex = 0;
        setPodcastIndex(String(lastSegmentIndex));
      }
      else {
        if (parseInt(podcastIndex) === lastSegmentIndex) { // if the podcastIndex is the last one generated then we can generated the next segment. 
            // If the podcast is not the intro try to start generating the next segment.
            lastSegmentIndex += 1;
            setPodcastIndex(String(lastSegmentIndex));

            if (maxIndex === ceilIndex) { // Meaning we have found the limit, and we can stop generating new segments.

              const responsePromise = createNextSegment(podcastIndex);
              responsePromise.then(response => {
                if (response === 429) { // We hit the rate limit, stop generating new segments.
                  maxIndex = parseInt(podcastIndex) + 2;
                  console.log("Rate Limit Hit");
                  return;
                }
                if (response <= 299 && String(lastSegmentIndex) === podcastIndex) {
                    
                }
              });
            }
            else {
              if (lastSegmentIndex === maxIndex) {
                console.log("Max Index Reached");
                return;
              }
            }
        }
        else {
          setPodcastIndex(String(parseInt(podcastIndex) + 1));
          return;
        }
      }
    }
  };

  async function streamAudio(podcastIndex: string) {
    const url = `${base}get-segment-stream`;
    console.log("URL", url);
    const email = getCookie("email");
    const jwt = getCookie("jwt-token");

    const payload = {
      email: email, // Ensure this matches your cookie structure
      jwt: jwt,
      podcast_index: podcastIndex
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      console.log(response  + "response")

      if (response.ok) {
        // Getting Presigned S3 URL
        const jsonResponse = await response.json();
        console.log('get stream response', jsonResponse);

        const stream_url = jsonResponse.url;
        console.log('url', stream_url);
        
        if (podcastIndex !== 'intro') {
          content_preview = await getPodcastPreview(podcastIndex);
          setContentPreview(content_preview);
        }


        setAudioSrc(stream_url);
      }
      else {
        console.error("Failed to load audio");
        // Display Error onto the screen.
        // TODO: Add Error Handling
      }
    }
    catch { 

      console.error("Error fetching audio stream")
      // Display Error onto the screen.
    }
  }

  useEffect(() => {
    streamAudio(podcastIndex);
    const player = audioPlayerRef.current;
    if (player) {
      const handleAudioEnd = () => nextPodcastIndex();
      player.addEventListener('ended', handleAudioEnd);

      // Cleanup function to remove event listener
      return () => player.removeEventListener('ended', handleAudioEnd);
    }
  }, [podcastIndex]);

  return (
    <div>
      <audio id="audioPlayer" ref={audioPlayerRef} autoPlay controls src={audioSrc}></audio> // TODO: If its done, it'll be event. 
      
      <div>
        <h1>{content_preview?.content_preview_title}</h1>
        <p>{content_preview?.script}</p>
      </div>
      <div>
        <button onClick={previousPodcastIndex}>Previous</button>
        <button onClick={nextPodcastIndex}>Next</button>
      </div>
    </div>
  );
}



  // Use useEffect to trigger the audio streaming when the component mounts or when podcastIndex changes
  
  // TODO: We need to do s3 pre-signed urls for the audio files.

export default AudioPlayer;
// Main react function for the podcast player.
//


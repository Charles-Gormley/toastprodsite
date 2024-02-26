"use client"

import MediaButtons from "@/components/MediaButtons";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { getCookie, setCookie } from "/src/components/cookies.tsx";
import { LinkedList } from "/src/components/LinkedList.tsx";


import React, { useEffect, useState } from 'react';

// TODO: Complete redesign.(CSS) 
// TODO: Grab the podcast data from the server. [ Done]
// TODO: Grab the podcast data of the current user. [ Done ] 
// TODO: Better Audio Bar Design. 
// TODO: Podcast Previews on the side. 
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


// Audio Player
interface AudioPlayerProps {
  podcastIndex: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [podcastIndex, setPodcastIndex] = useState('intro');
  

  // Previous Podcast Index
  const previousPodcastIndex = () => {
    if (podcastIndex !== 'intro') {
      const newIndex = podcastIndex === '0' ? 'intro' : (parseInt(podcastIndex) - 1).toString();
      setPodcastIndex(newIndex);
    }
  };

  // Next Podcast Index
  const nextPodcastIndex = () => {
    if (podcastIndex === 'intro') {
      // TODO: Call the next segment api endpoint
      // TODO: If this call fails ( we hit the rate limit for the day ) This will be the max index.
      // try{
      //   // TODO: Next segment api call
      // }
      // catch{
      //   // TODO: maxindex = 5; // set maxIndex to near 
      // }
      // TODO: (Optional): Would be nice to have that next segment is only 

      // API for Next Segment Creation
      // app.post('/create-next-segment/', async (req, res) => {
      //   const { email, jwt, character, tone} = req.body; // TODO: grab character and tone from the cookie.
      //   const user_id = getUserID(email);

      //   const next_segment_response = await createNextPodcastSegment(user_id, jwt, character, tone);

      //   return res.status(next_segment_response.status_code).json(next_segment_response);
      // });

      setPodcastIndex('0');
    } else {
      const newIndex = Math.min(parseInt(podcastIndex) + 1).toString();
      setPodcastIndex(newIndex);
      
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

        setAudioSrc(stream_url);
      }
      else {
        console.error("Failed to load audio");
        // Display Error onto the screen.
      }
    }
    catch { 

      console.error("Error fetching audio stream")
      // Display Error onto the screen.
    }
  }
  useEffect(() => {
    streamAudio(podcastIndex);
  }, [podcastIndex]);

  return (
    <div>
      <audio id="audioPlayer" controls src={audioSrc}></audio>
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


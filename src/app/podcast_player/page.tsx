"use client"

import MediaButtons from "@/components/MediaButtons";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

export default function PodcastPlayer() {
  const colors = {
    playerBackground: "#d1d5db",
    titleColor: "#000000",
    timeColor: "#000000",
    progressSlider: "#eab308",
    progressUsed: "#000000",
    progressLeft: "#151616",
    bufferLoaded: "#202222",
    volumeSlider: "#eab308",
    volumeUsed: "#000000",
    volumeLeft: "#151616",
  };
  
  const tracks = [
    {
      url: "StarWars60.wav",
      title: "Test",
      tags: [],
    },
    {
      url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
      title: "Test2",
      tags: [],
    }
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center h-4/5">
        <div className="flex flex-col items-center w-1/2 mr-9">
          <div className="flex mt-4 w-full bg-gray-300">
            <p className="mr-2 p-2 w-full rounded-lg text-center font-bold">
              Podcast Player
            </p>
          </div>
          <div className="h-full border-4 border-gray-300">
            <p className="overflow-y-scroll m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              quam consectetur corporis laudantium excepturi explicabo
              voluptate, eum nam fugit molestiae esse adipisci? Consectetur
              eaque libero quia blanditiis? Debitis, incidunt ab.
            </p>
          </div>
          <div className="bg-gray-300 w-full h-1/4 relative flex-col">
            {tracks && <Player
              trackList={tracks}
              includeTags={false}
              includeSearch={false}
              showPlaylist={false}
              sortTracks={true}
              autoPlayNextTrack={true}
              customColorScheme={colors}
            />}
          </div>
        </div>
      </div>
      
    </div>
  );
}



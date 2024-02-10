import MediaButtons from "@/components/MediaButtons";

export default function PodcastPlayer() {
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
            <MediaButtons />
            <progress
              className="progress w-3/4 flex m-auto mt-5 progress-black"
              value="70"
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    </div>
  );
}

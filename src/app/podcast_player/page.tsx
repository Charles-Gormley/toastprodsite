import Link from "next/link";
import Image from "next/image";
import move_ahead from "./images/move_ahead.png";
import move_behind from "./images/move_behind.png";
import play from "./images/play.png";
import skip_back from "./images/skip_back.png";
import skip_fwd from "./images/skip_fwd.png";

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
            <div className="bg-gray-300 flex relative justify-between w-1/2 m-auto mt-5">
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                </svg>
              </button>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                </svg>
              </button>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.47 2.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H9a5.25 5.25 0 1 0 0 10.5h3a.75.75 0 0 1 0 1.5H9a6.75 6.75 0 0 1 0-13.5h10.19l-4.72-4.72a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
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

import Link from 'next/link';
import Image from "next/image";
import move_ahead from "./images/move_ahead.png";
import move_behind from "./images/move_behind.png";
import play from "./images/play.png";
import skip_back from "./images/skip_back.png";
import skip_fwd from "./images/skip_fwd.png";

export default function PodcastPlayer() {
    
    return (
        <div className='flex flex-col h-full' >
            <div className='flex justify-center h-4/5'>
                <div className='flex flex-col items-center w-1/2 mr-9'>
                    <div className="flex mt-4 w-full bg-gray-300">
                        <p className='mr-2 p-2 w-full rounded-lg text-center font-bold'>Podcast Player</p>
                    </div>
                    <div className='h-full border-4 border-gray-300'>
                        <p className='overflow-y-scroll m-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quam consectetur corporis laudantium excepturi explicabo voluptate, eum nam fugit molestiae esse adipisci? Consectetur eaque libero quia blanditiis? Debitis, incidunt ab.</p>
                    </div>
                    <div className='bg-gray-300 w-full h-1/4 relative flex-col'>
                        <div className='bg-gray-300 flex relative justify-between w-1/2 m-auto mt-5'>
                            <button className=''>
                                <Image src={move_behind} alt="Button Image"/>
                            </button>
                            <button className=''>
                                <Image src={skip_back} alt="Button Image"/>
                            </button>
                            <button className=''>
                                <Image src={play} alt="Button Image"/>
                            </button>
                            <button className=''>
                                <Image src={skip_fwd} alt="Button Image"/>
                            </button>
                            <button className=''>
                                <Image src={move_ahead} alt="Button Image"/>
                            </button>
                        </div>
                        <progress className="progress w-3/4 flex m-auto mt-5 progress-warning" value="70" max="100"></progress>
                    </div>
                </div>
                <div className="flex flex-col">
                        {/* Segment buttons */}
                        <h3 className='my-3 p-4 font-bold'>Segments</h3>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-4 rounded-lg mb-4">Intro</button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-4 rounded-lg mb-4">Segment 1</button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-4 rounded-lg mb-4">Segment 2</button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-4 rounded-lg mb-4">Segment 3</button>
                </div>
            </div>
        </div>
        
    )
}


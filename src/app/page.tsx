'use client'

import Hero from "../components/Hero";
import Infograph from "../components/Infograph";
import HeroImg from "../assets/heroImg.png";
import { useMediaQuery } from 'react-responsive';

export default function Home() {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Hero
          title="The Future of News is Here"
          subtitle="Experience AI Curated Podcasts at your fingertips. Hear only the stories YOU want to hear, without the bias. With sources from thousands of articles, you can learn more in just one click."
        />

        {isMobile && (
          <button>
            <a
              href="/login"
              className="btn rounded-full px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 border border-transparent"
            >
              Create Your Podcast
            </a>
          </button>
        )}
        

        <Infograph
          heading="A New way to stay in the know."
          subHeading="Building on modern foundations"
          features={[
            {
              title: "It’s free! Yes, really.",
              description:
                "Access our free tier, supported by ads, to craft personalized 5-minute news podcasts curated to match your interests precisely.",
            },
            {
              title: "Anytime, Anywhere",
              description:
                "Stay ahead of the curve with our breaking news coverage. We generate content on recent events to offer a nuanced understanding of all perspectives involved. Stay informed with our concise, comprehensive updates.",
            },
            {
              title: "Unbiased and Unfiltered",
              description:
                "Experience mathematically unbiased news. We’ve scoured the internet to bring you balanced input from all sides of the story in an easy to digest format.",
            },
          ]}
        />
      </div>
    );
  }

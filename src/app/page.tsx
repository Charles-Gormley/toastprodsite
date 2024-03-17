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
          title="A Mathematical Approach to News."
          subtitle="Experience an AI/ML Driven News Platforms. Look at the bias within news stories, get a carefully curated list of articles around your favorite topics, generate news roundup podcasts, listen to AI News Debates around podcasts, and be more informed about your world without the bias."
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
          heading="The Future of News is Here."
          subHeading="Building on modern foundations"
          features={[
            {
              title: "It’s free!",
              description:
                "Access our ad-supported tier to search through your news feed and listen to quick news roundup podcasts.",
            },
            {
              title: "Broad Coverage. In Depth Analysis",
              description:
                "Stay ahead of the curve with our breaking news coverage. We generate content on recent events to offer a nuanced understanding of all perspectives involved. Stay informed with our concise, comprehensive updates.",
            },
            {
              title: "View the Bias to see the Full Picture",
              description:
                "Experience mathematically unbiased news. We’ve scoured the internet to bring you balanced input from all sides of the story in an easy to digest format.",
            },
          ]}
        />
      </div>
    );
  }

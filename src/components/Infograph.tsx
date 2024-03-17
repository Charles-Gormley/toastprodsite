import React from 'react';
import Image from 'next/image';
import microphoneImage from "../assets/microphone.png";
import Container from './Container';

interface Feature {
  title: string;
  description: string;
}

interface HeroSectionProps {
  heading: string;
  subHeading: string;
  features: Feature[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subHeading,
  features,
}) => {
  return (
    <Container>
      <main className="flex flex-col lg:flex-row text-black">
      <Image
            src={microphoneImage}
            alt="Microphone"
            width={500}
            height={500}
            className="rounded-lg"
          />
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-4">{heading}</h1>
          <h2 className="text-xl mb-4">{subHeading}</h2>
          <div>
            {features.map((feature, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Container>
  );
};

export default HeroSection;

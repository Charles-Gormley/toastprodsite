import React from "react";
import Image from "next/image";
import heroImage from "../assets/heroImg.png";
import Container from "./Container";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const HeroSection = ({ title, subtitle }: HeroSectionProps) => {
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center pt-16 pb-8 md:pt-12 md:pb-24">
        <div className="lg:w-1/2 px-4 py-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
            {title}
          </h1>
          <p className="text-lg mt-4 text-slate-600 dark:text-white">
            {subtitle}
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end px-4 py-6">
          <Image
            src={heroImage}
            alt="Charlie The Podcaster"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;

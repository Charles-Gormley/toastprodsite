import React from "react";
import Image from "next/image";
import heroImage from "../assets/heroImg.png";
import Container from "./Container";
import Link from "next/link";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const HeroSection = ({ title, subtitle }: HeroSectionProps) => {
  return (
    <>
      <Container>
        <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24 dark:text-white">
          <div className="py-6 md:order-1 hidden md:block">
            <Image
              src={heroImage}
              alt="Charlie The Podcaster"
              layout="responsive"
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
              {title}
            </h1>
            <p className="text-lg mt-4 text-slate-600 max-w-xl dark:text-white">
              {subtitle}
            </p>
          </div>
        </main>
      </Container>
    </>
  );
};

export default HeroSection;

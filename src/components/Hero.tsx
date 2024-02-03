import React from 'react';
import Container from './Container';

interface HomePageProps {
  title?: string;
  subtitle?: string;
  startLink?: { href: string; label: string };
  learnMoreLink?: { href: string; label: string };
}

const HomePage: React.FC<HomePageProps> = ({
  title,
  subtitle,
  startLink,
  learnMoreLink,
}) => {
  return (
    <div className="relative dark:bg-gray-900" id="home"> {/* dark mode background */}
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            {title && (
              <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                {title} <span className="text-primary dark:text-white"></span>
              </h1>
            )}
            {subtitle && (
              <p className="mt-8 text-gray-700 dark:text-gray-300">
                {subtitle}
              </p>
            )}
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              {startLink && (
                <a
                  href={startLink.href}
                  className="relative flex h-11 w-full items-center justify-center px-6 bg-primary dark:bg-primary-dark text-white font-semibold rounded-full transition duration-300 hover:scale-105 active:scale-95 sm:w-max"
                >
                  {startLink.label}
                </a>
              )}
              {learnMoreLink && (
                <a
                  href={learnMoreLink.href}
                  className="relative flex h-11 w-full items-center justify-center px-6 bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-white font-semibold rounded-full transition duration-300 hover:scale-105 active:scale-95 border border-transparent sm:w-max"
                >
                  {learnMoreLink.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;

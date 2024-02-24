"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.svg";
import { Covered_By_Your_Grace } from "next/font/google";

const covered_by_your_grace = Covered_By_Your_Grace({
  family: 'Helvetica Neue',
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin']
})

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    ["/", "Home"],
    ["/pricing", "Pricing"],
    ["/contact", "Contact Us"],
  ];

  let classNameVar = `${covered_by_your_grace.className} text-5xl ml-4`
  
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-900 relative">
      <Image
        src={logo}
        alt="Logo"
        width={40}
        height={40}
        className="dark:filter dark:invert"
      />
      
      <h1>    Pilot</h1>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden px-2 py-1 border rounded text-gray-900 dark:text-white"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:hidden flex-col items-center fixed inset-0 top-14 mt-2 bg-white dark:bg-gray-900 shadow-md z-20`}
      >
        <ul className="w-full space-y-1">
          {tabs.map(([href, label], index) => (
            <li
              key={index}
              className="text-gray-900 dark:text-white hover:font-bold w-full"
            >
              <Link className="block text-center py-2" href={href}>
                {label}
              </Link>
            </li>
          ))}
          <li className="w-full">
            <Link
              className="block text-center py-2 bg-black text-white font-bold rounded hover:bg-gray-800 transition duration-300 w-full"
              href="/login"
            >
              Create Your Podcast
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center">
        <ul className="flex space-x-4">
          {tabs.map(([href, label], index) => (
            <li
              key={index}
              className="text-gray-900 dark:text-white hover:font-bold"
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden md:block">
        <Link href="/login">
          <button className="btn rounded-full px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 border border-transparent dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-900 dark:hover:text-white transition duration-300">
            Create Your Podcast
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

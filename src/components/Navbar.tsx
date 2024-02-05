import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.svg';

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={40} height={40} className="dark:filter dark:invert" />
        <span className="font-bold text-xl text-gray-900 dark:text-white ml-2">
          Tokenized Toast
        </span>
      </div>

      <ul className="flex space-x-4">
        <li className="text-gray-900 dark:text-white">
          <Link href="/"> Home </Link>
        </li>
        <li className="text-gray-900 dark:text-white">
          <Link href="/about"> About Us </Link>
        </li>
        <li className="text-gray-900 dark:text-white">
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
      {/* Update button classes for dark mode */}
      <button className="rounded-full px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 border border-transparent dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-900 dark:hover:text-white transition duration-300">
        <Link href="/login">Create Your Podcast</Link>
      </button>
    </nav>
  );
};

export default NavBar;

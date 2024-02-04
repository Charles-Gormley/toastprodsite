import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.svg';

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        {/* SVG logo next to the site title */}
        <Image src={logo} alt="Logo" width={40} height={40} />
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
      <button className="rounded-full px-6 py-2 bg-black text-white font-bold hover:bg-black dark:bg-transparent dark:border dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black transition duration-300">
        <Link href="/podcast">Create Your Podcast</Link>
      </button>
    </nav>
  );
};

export default NavBar;

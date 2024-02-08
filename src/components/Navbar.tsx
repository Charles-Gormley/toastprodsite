import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.svg";

const li_hover = "text-gray-900 dark:text-white hover:font-bold";

const tabs = [
  ["/", "Home"],
  ["/pricing", "Pricing"],
  ["/contact", "Contact Us"],
];
const links = tabs.map((string) => {
  return <Link href={string[0]}>{string[1]}</Link>;
});

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="dark:filter dark:invert"
        />
        <span className="font-bold text-xl text-gray-900 dark:text-white ml-2">
          Tokenized Toast
        </span>
      </div>

      <ul className="flex space-x-4">
        {links.map((link, index) => {
          return (
            <li key={index} className={li_hover}>
              {link}
            </li>
          );
        })}
      </ul>
      <button className="btn rounded-full px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 border border-transparent dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-900 dark:hover:text-white transition duration-300">
        <Link href="/login">Create Your Podcast</Link>
      </button>
    </nav>
  );
};

export default NavBar;

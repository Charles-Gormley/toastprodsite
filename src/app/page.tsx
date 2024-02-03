import Image from "next/image";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-gray-900">
      <Navbar/>
      <Hero title="THE FUTURE OF NEWS!" subtitle="BRB" />
    </div>
  );
}

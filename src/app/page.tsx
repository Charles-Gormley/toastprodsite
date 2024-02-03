import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col dark:bg-gray-900">
      <Hero
        title="The Future of News is Here"
        subtitle="Experience AI Curated Podcasts at your fingertips. Hear only the stories YOU want to hear, without the bias. With sources from thousands of articles, you can learn more in just one click."
      />
    </div>
  );
}

import Image from "next/image";
import placeholder1 from "../../assets/placeholder_about1.png";
import placeholder2 from "../../assets/placeholder_about2.png";
import placeholder3 from "../../assets/placeholder_about3.png";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-3">Our Story</h1>
        <p className="mb-6">
          We're pioneering a new podcasting paradigm powered by AI, giving you
          insights into the topics you care about, from niche technology updates
          to personalized financial news.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Not just another Podcast
          </h2>
          <p>
            Our journey began with a simple question: Are there podcasts out
            there that feed our unique curiosities? We craved content that
            delved into the intricacies of computer vision, that unraveled the
            mysteries of genomics, or even sparked lively debates over the
            superiority of our breakfast cereals. Yet, such tailored auditory
            delights seemed just out of reach—until now.
          </p>
        </div>
        <Image
          src={placeholder1}
          alt="Hammock"
          className="rounded-lg"
          width={600}
          height={300}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
        <Image
          src={placeholder2}
          alt="Community"
          className="rounded-lg"
          width={600}
          height={300}
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4">Transparency</h2>
          <p>
            Our mission is to democratize information, providing a multitude of
            perspectives on every subject. We utilize AI to break down the
            barriers of traditional podcasting, offering a platform for
            learning, discovery, and balanced understanding.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Tackling Polarization</h2>
          <p>
            We understand the dangers of political polarization and information
            silos. Our innovative AI-driven platform is designed to present
            multiple facets of every story, fostering a well-rounded
            understanding and bridging divides.
          </p>
        </div>
        <Image
          src={placeholder3}
          alt="Community"
          className="rounded-lg"
          width={600}
          height={300}
        />
      </section>
    </div>
  );
}

import Image from "next/image";
import placeholder1 from "../../assets/placeholder_about1.png";


export default function Contact() {
  return (
    <div>
      <div className="flex justify-center items-center h-64 mb-8">
        <h1 className="text-black text-center font-bold text-7xl mr-8">Get in Touch</h1>
        <Image
          src={placeholder1}
          alt="Hammock"
          width={180}
          height={90}
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 h-96">
          <div className="mb-4 flex">
            <div className="mr-2 w-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                id="firstName"
                type="text"
                placeholder="First Name"
              />
            </div>

            <div className="mr-2 w-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                id="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <div className="w-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                id="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
          </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            id="message"
            rows={6}
            placeholder="Your message here..."
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded focus:outline-none"
            type="button"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
    </div>
  );
    
}
  
  
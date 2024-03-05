import Image from "next/image";
import placeholder1 from "../../assets/placeholder_about1.png";

export default function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col items-center p-8">
          {/* Responsive image */}
          <Image
            src={placeholder1}
            alt="ToastedToast"
            width={360} // Adjust the size accordingly
            height={180}
            className="mb-4"
          />
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
            Join the Waitlist!
          </h2>
          <form
            action="https://submit-form.com/9QhxmS468"
            className="w-full max-w-sm space-y-4"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Subscribe Me</span>
                <input type="checkbox" defaultChecked className="checkbox" />
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-black bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

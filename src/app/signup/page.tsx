import React from "react";
import HeroImg from "../../assets/placeholder_signup.png";

const SignUp = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2 flex justify-center items-center bg-cover p-10">
        <img
          src={HeroImg.src}
          alt="Hero"
          className="max-w-xs md:max-w-sm m-auto"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Create an Account
          </h2>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Email Address"
            />
            <input
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="w-full mt-6 px-4 py-3 bg-black text-white font-bold rounded hover:bg-gray-700">
            Create Account
          </button>
          <div className="text-center mt-4">
            <a href="/login" className="text-sm text-gray-500 hover:underline">
              Already have an account? Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

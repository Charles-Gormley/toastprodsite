import React from "react";
import Link from "next/link";
import HeroImg from "../../assets/placeholder_login.png";

const SignUp = () => {
  return (
    <div className="flex flex-wrap min-h-screen bg-white">
      <div className="flex justify-center items-center w-full lg:w-1/2 bg-cover p-10">
        <img
          src={HeroImg.src}
          alt="Hero"
          className="max-w-xs sm:max-w-sm m-auto"
        />
      </div>

      <div className="flex justify-center items-center w-full lg:w-1/2 p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Welcome Back!
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
            <Link href="/signup">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

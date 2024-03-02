'use client'
import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Link from "next/link";
import { getCookie, setCookie } from "../../components/cookies";
import HeroImg from "../../assets/placeholder_login.png";
import { useRouter } from "next/navigation";


const LogIn = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef:any = useRef();

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const router = useRouter();
  async function handleSubmit(e:any) {
    e.preventDefault();

    try {
      const response = await fetch('https://api.tokenizedtoast.com/user-login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ email: email, password: password }),
      })
      console.log(response);
      if (!response.ok) {
        if (!response) {
          setErrMsg('No Server Response');
        } else if (response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
        return;
      }
      const json_response = await response.json();
      console.log(`${json_response.message}`);
      const jwtToken = json_response.jwt;
      setAuth({email, jwtToken}); // TODO: This is a point of failure
      setCookie('jwt-token', jwtToken); // TODO: This is a point of failure
      setCookie('email', email); // TODO: This is a point of failure
      router.push("/podcast");
    } catch (err:any) {
      console.error('LOGIN ERROR:', err.message);
      setErrMsg('An error occurred. Please try again later.');
    }
  }

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
          {errMsg && <p  className="text-red-500 text-center mb-5 text-lg">{errMsg}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={userRef}
              required
            />
            <input
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full mt-6 px-4 py-3 bg-black text-white font-bold rounded hover:bg-gray-700">
            Log In
            </button>
          </form>
          
          <div className="text-center mt-4">
            <Link href="/signup">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

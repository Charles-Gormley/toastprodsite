"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeroImg from "../../assets/placeholder_signup.png";
import { useState, useEffect } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErrMessage, setPasswordErrMessage] = useState("");

  const [matchPassword, setMatchPassword] = useState("");
  const [matchPasswordErrMessage, setMatchPasswordErrMessage] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [errorsPresent, setErrorsPresent] = useState(false);

  const [accessCode, setAccessCode] = useState("");
  const [tokenErrorMessage, setTokenErrorMessage] = useState("");

  const fetchData = async () => {
    const url =
      "https://k4pb7ngegvtmqlvzfb2rj6zujm0jlbbt.lambda-url.us-east-1.on.aws/";
    const params = new URLSearchParams({
      accessToken: accessCode,
      email: "123@test.com",
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (response.ok) {
        console.log(`Access Code ${accessCode} is valid!`);
        const data = await response.text();
        console.log(data);
        setTokenErrorMessage("");

        return true;
      } else {
        console.log("Response not successful:", response.statusText);
        setTokenErrorMessage("Invalid access code.");

        return false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTokenErrorMessage("Network or server error.");

      return false;
    }
  };

  async function handleTokenChange(e: any) {
    setAccessCode(e.target.value);
    return true;
    
    //if ((await fetchData()) === false) {
    //  setTokenErrorMessage("Invalid access code.");
    //  return;
    //}
    //return setTokenErrorMessage("");
  }

  useEffect(() => {
    if (
      emailErr ||
      passwordErrMessage ||
      matchPasswordErrMessage ||
      tokenErrorMessage
    ) {
      setErrorsPresent(true);
    } else {
      setErrorsPresent(false);
    }
  }, [
    emailErr,
    passwordErrMessage,
    matchPasswordErrMessage,
    tokenErrorMessage,
  ]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  function validateEmail() {
    return EMAIL_REGEX.test(email);
  }

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
    if (validateEmail()) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  }

  function handlePasswordChange(e: any) {
    const pwd = e.target.value;
    setPassword(e.target.value);
    if (pwd.length < 8) {
      setPasswordErrMessage("Password must be 8 at least characters");
      return;
    }
    if (pwd.length > 24) {
      setPasswordErrMessage("Password must be less than 24 characters");
      return;
    }
    if (!PWD_REGEX.test(pwd)) {
      setPasswordErrMessage(
        "Invalid Password: You must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ %"
      );
      return;
    }
    setPasswordErrMessage("");
  }

  function handleMatchPasswordChange(e: any) {
    const newPassword = e.target.value;
    setMatchPassword(newPassword);
    if (password === newPassword) {
      setMatchPasswordErrMessage("");
    } else {
      setMatchPasswordErrMessage("Passwords Do Not Match");
    }
  }

  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    // if button enabled with JS hack
    await fetchData(); // Make sure to wait for fetchData to complete
    // if (tokenErrorMessage) {
    //  console.error("Invalid access token. Please check and try again.");
    //  return; // Exit the function if there's a token error
    //}

    if (await fetchData() === false) {
      console.error("Invalid access token. Please check and try again.");
      return;
    }
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    const v3 = await fetchData() === false;
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    if (!v1) {
      setErrMsg("Invalid email address");
    }

    if (!v2) {
      setErrMsg("Invalid password");
    }

    if (v3) {
      setErrMsg("Invalid access token. Please check and try again.");
    }
    try {
      const response = await fetch(
        "https://api.tokenizedtoast.com/user-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to sign up user");
      }

      //const data = await response.json();
      console.log(response);
      // *****Handle response data here*****

      router.push(`/verification/${email}`);
    } catch (error: any) {
      console.error("Error signing up user:", error.message);
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
            Create an Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                emailErr && "border-red-500"
              }`}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailErr && <p className="text-red-500 text-sm">Invalid Email</p>}
            <input
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                passwordErrMessage && "border-red-500"
              }`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordErrMessage && password && (
              <p className="text-red-500 text-sm">{passwordErrMessage}</p>
            )}
            <input
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                matchPasswordErrMessage && "border-red-500"
              }`}
              type="password"
              placeholder="Confirm Password"
              value={matchPassword}
              onChange={handleMatchPasswordChange}
              required
            />
            <input
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                tokenErrorMessage && "border-red-500"
              }`}
              type="text"
              placeholder="Enter Access Token"
              value={accessCode}
              onChange={handleTokenChange}
              required
            />
            {tokenErrorMessage && (
              <p className="text-red-500 text-sm">{tokenErrorMessage}</p>
            )}
            <button
              className={`w-full mt-6 px-4 py-3 bg-black text-white font-bold rounded hover:bg-gray-700 ${
                errorsPresent && "cursor-not-allowed"
              }`}
              disabled={errorsPresent}
            >
              Create Account
            </button>
            {errMsg && <p className="text-red-500">Invalid Entry</p>}
          </form>
          <div className="text-center mt-4">
            <Link href="/login">Already have an Account ? Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

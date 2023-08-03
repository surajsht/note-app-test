"use client";

import { useState } from "react";
import { auth } from "../config/FireConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

const Signup = () => {
  let [UserName, setUserName] = useState("");
  let [UserEmail, setUserEmail] = useState("");
  let [UserPassword, setUserPassword] = useState("");
  let [error, setError] = useState("");

  const router = useRouter();

  const SignupUser = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, UserEmail, UserPassword);
      await updateProfile(auth.currentUser, {
        displayName: UserName,
      });
      router.push("/profile");
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <div className="container h-screen flex justify-center flex-col items-center mx-auto">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action=""
        >
          {error ? <p className="text-red-600 mb-2"> {error} </p> : null}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              value={UserEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={UserPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          <button
            className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => SignupUser()}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

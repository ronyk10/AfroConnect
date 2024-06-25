"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0 || username.length === 0) {
      alert("Please provide all the details");
      return;
    }
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen justify-center items-center flex-col">
        <div className="flex justify-center item-center text-center mt-24 flex-col">
          <div className="flex items-center justify-center">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-12 h-12 text-blue-500"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-4xl tracking-tight">Register a new account</h2>
          <span className="text-sm">
            or{" "}
            <a href="/register" className="text-blue-500">
              Login to your account
            </a>
          </span>
        </div>
        <div className="flex justify-center my-2 mx-4 md:mx-0">
          <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="bg-gray-200 rounded-xl"
                    type="text"
                    required
                  />
                </div>
                <label className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                  Email address
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="bg-gray-200 rounded-xl"
                  type="email"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="bg-gray-200 rounded-xl"
                  type="password"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6">
                <button
                  onClick={(e) => submit(e)}
                  className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Page;

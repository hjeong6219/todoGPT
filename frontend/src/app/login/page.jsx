// src/components/Login.js
// import React, { useState } from "react";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      {/* Left Side (Introduction with Images) */}
      <div className="flex flex-col items-center justify-center flex-1 p-8 bg-gray-700 md:p-12">
        <img
          src="https://via.placeholder.com/250x250"
          alt="App Preview"
          className="mb-4 rounded-lg shadow-lg"
        />
        <div className="text-center text-white">
          <h2 className="mb-4 text-3xl font-semibold">AI-Powered ToDo App</h2>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in
            velit auctor, sodales metus eget, cursus leo.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl text-white">Key Features</h3>
          <ul className="pl-6 mt-4 text-gray-300 list-disc">
            <li>Smart task management</li>
            <li>Intuitive user interface</li>
            <li>Real-time collaboration</li>
            <li>AI-driven recommendations</li>
          </ul>
        </div>
      </div>
      {/* Right Side (Login) */}
      <div className="flex items-center justify-center flex-1 p-8 bg-white md:p-12">
        <div className="w-full md:w-96">
          <h2 className="mb-4 text-3xl font-semibold text-center">Login</h2>
          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
                // value={email}
                // onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
                // value={password}
                // onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
          <LoginLink>Sign In</LoginLink>
        </div>
      </div>
    </div>
  );
};

export default Login;

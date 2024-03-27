"use client";
import SignUp from "@/components/user/SignUp";
import SignIn from "@/components/user/SignIn";
import { useState } from "react";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

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
    <div className="flex min-h-screen bg-gray-200">
      <div className="flex items-center justify-center flex-1 ">
        <div className="w-auto p-16 bg-white rounded-lg ">
          {isSignUp ? (
            <SignUp setIsSignUp={setIsSignUp} />
          ) : (
            <SignIn setIsSignUp={setIsSignUp} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

"use client";
import SignUp from "@/components/user/SignUp";
import SignIn from "@/components/user/SignIn";
import { useState } from "react";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

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

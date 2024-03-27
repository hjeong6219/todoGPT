import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

function SignIn({ setIsSignUp }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("callbackUrl");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (response?.status == 200) {
        toast.success("Sign in successful");
        return router.push(param || "/");
      } else if (response.error) {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSSO = async (provider) => {
    try {
      const response = await signIn(provider, {
        callbackUrl: param || "/",
      });
      if (response?.status == 200) {
        return router.push(param || "/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold text-center">Sign In</h2>
      <form className="my-2" onSubmit={handleSubmit}>
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
            name="email"
            className="px-4 py-2 border border-gray-300 rounded-md w-96 focus:ring focus:ring-blue-400 focus:outline-none"
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
            name="password"
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
      <div className="py-2">
        <hr className="my-4 border-gray-300" />
        <p className="block my-4 text-center text-gray-600">
          Or Sign in with SSO
        </p>
        <button
          className="flex w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
          onClick={() => handleSSO("github")}
        >
          <section className="flex mx-auto">
            <img
              src="/logos/github.png"
              alt="GitHub Logo"
              className="w-8 h-8"
            />
            <p className="my-auto ml-2 mr-4">GitHub</p>
          </section>
        </button>
      </div>

      <div className="py-2">
        <hr className="my-4 border-gray-300" />
        <p>
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:text-blue-600"
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;

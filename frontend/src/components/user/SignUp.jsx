import { useRegisterUserMutation } from "@/app/features/user/usersApi";
import toast from "react-hot-toast";

function SignUp({ setIsSignUp }) {
  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await registerUser({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      console.log(response);
      if (response?.data?.success == true) {
        setIsSignUp(false);
        toast.success("Sign up successful");
      } else if (response.error) {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <h2 className="mb-4 text-3xl font-semibold text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="Full Name"
            className="block mb-2 font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="px-4 py-2 border border-gray-300 rounded-md w-96 focus:ring focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your full name"
            required
          />
        </div>
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
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:text-blue-600"
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </>
  );
}

export default SignUp;

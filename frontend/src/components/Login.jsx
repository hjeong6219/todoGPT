import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

function Login() {
  return (
    <button className="px-3 py-2 my-5 text-2xl text-blue-800 rounded-xl bg-sky-300">
      <LoginLink>Let's get started!</LoginLink>
    </button>
  );
}

export default Login;

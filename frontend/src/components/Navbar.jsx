import Image from "next/image";
import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="flex items-center justify-between w-full mx-auto font-bold bg-stone-50">
      <Link href="/" className="px-10 my-10 text-3xl text-stone-800">
        TodoGPT
      </Link>
      <div className="flex items-center gap-4 px-10">
        {isAuthenticated() ? (
          <div className="flex gap-4 font-normal">
            {user?.picture ? (
              <Image
                className="rounded-full"
                src={user?.picture}
                width={55}
                height={55}
                alt="user profile avatar"
              />
            ) : (
              <div className="px-5 pt-4 text-white bg-black rounded-full ">
                {user?.given_name?.[0]}
                {user?.family_name?.[0]}
              </div>
            )}
            <div>
              <p className="text-2xl">
                {user?.given_name} {user?.family_name}
              </p>

              <LogoutLink className="text-black">Log out</LogoutLink>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6 text-xl ">
            <RegisterLink className="text-stone-800">Register</RegisterLink>
            <LoginLink className="px-4 py-2 rounded-xl bg-stone-800 text-stone-50">
              Get Started
            </LoginLink>
          </div>
        )}
      </div>
    </nav>
  );
}

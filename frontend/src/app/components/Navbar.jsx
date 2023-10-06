import Image from "next/image";
import {
  getKindeServerSession,
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <nav className="flex items-center justify-between w-full mx-auto font-bold bg-stone-50">
      <h1 className="px-10 my-10 text-3xl">KindeAuth</h1>
      <div className="flex items-center gap-4 px-10">
        {isAuthenticated() && (
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
              <div className="p-4 text-white bg-black rounded-full">
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
        )}
      </div>
    </nav>
  );
}

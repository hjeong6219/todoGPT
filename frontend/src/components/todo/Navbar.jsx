import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";

function Navbar() {
  const pathname = usePathname();
  const userName = useSelector((state) => state?.userSlice?.fullName);
  return (
    <nav className="bg-slate-50">
      <div className="px-4 py-6">
        {userName && (
          <div className="flex flex-col items-center mb-6">
            <div className="p-4 bg-blue-400 rounded-full"></div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {userName}
            </h2>
          </div>
        )}
        <ul className="space-y-3">
          <li>
            <Link
              href="/dashboard"
              className={`text-gray-700 block py-2.5 px-4 lg:text-lg rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                pathname === "/dashboard" && "bg-blue-100 text-blue-800"
              }}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/todos"
              className={`text-gray-700 block py-2.5 px-4 lg:text-lg rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                pathname === "/todos" && "bg-blue-100 text-blue-800"
              }`}
            >
              My Todos
            </Link>
          </li>
          <li>
            <Link
              href="/calendar"
              className={`text-gray-700 block py-2.5 px-4 lg:text-lg rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                pathname === "/calendar" && "bg-blue-100 text-blue-800"
              }`}
            >
              Calendar
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`text-gray-700 block py-2.5 px-4 lg:text-lg rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                pathname === "/account" && "bg-blue-100 text-blue-800"
              }`}
            >
              Account
            </Link>
          </li>
        </ul>
        <div className="mt-6">
          <button
            onClick={() => signOut()}
            className="block w-full px-4 py-2 text-center text-gray-700 transition duration-200 border border-gray-300 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

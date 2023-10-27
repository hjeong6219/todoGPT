import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="h-full bg-white shadow-lg">
      <div className="px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <div className="p-4 bg-blue-400 rounded-full"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h2>
        </div>
        <ul className="space-y-3">
          <li>
            <Link
              href="/"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              My Todos
            </Link>
          </li>
          <li>
            <Link
              href="/calendar"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Calendar
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Account
            </Link>
          </li>
        </ul>
        <div className="mt-6">
          <LogoutLink className="block w-full px-4 py-2 text-center text-gray-700 transition duration-200 border border-gray-300 rounded hover:bg-gray-100">
            Logout
          </LogoutLink>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

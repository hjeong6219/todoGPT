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
            <a
              href="#"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              My Todos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Calendar
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Account
            </a>
          </li>
        </ul>
        <div className="mt-6">
          <a
            href="#"
            className="block w-full px-4 py-2 text-center text-gray-700 transition duration-200 border border-gray-300 rounded hover:bg-gray-100"
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

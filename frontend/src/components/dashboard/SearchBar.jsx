import { HiMiniMagnifyingGlass } from "react-icons/hi2";

function SearchBar() {
  return (
    <div className="relative w-full text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search"
        className="hidden float-right h-10 px-5 pr-10 text-sm bg-white rounded-full shadow-md focus:outline-none"
      />
      <button type="submit" className="float-right mt-3 mr-2">
        <HiMiniMagnifyingGlass className="w-4 h-4" />
      </button>
    </div>
  );
}

export default SearchBar;

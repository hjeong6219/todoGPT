import { useState, useRef, useEffect } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setTodo, setTodoSearch } from "@/app/features/todo/todoSlice";

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchInputRef = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setShowSearchBar(true);
  };

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setShowSearchBar(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="relative w-full text-gray-600">
      {showSearchBar ? (
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="float-right h-10 px-5 pr-10 text-sm bg-white rounded-full shadow-md focus:outline-none"
          ref={searchInputRef}
          onChange={(e) => dispatch(setTodoSearch(e.target.value))}
        />
      ) : (
        <button
          type="button"
          className="float-right mt-3 mr-2 "
          onClick={handleButtonClick}
        >
          <HiMiniMagnifyingGlass className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

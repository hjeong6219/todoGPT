import React, { useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi2";

const ToggleInput = ({ onAddTodo, columnId }) => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showTextArea &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setInputValue("");
        setShowTextArea(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTextArea]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onAddTodo(columnId, inputValue);
      setInputValue("");
      setShowTextArea(false);
    }
    if (event.key === "Escape") {
      setInputValue("");
      setShowTextArea(false);
    }
  };

  return (
    <>
      {showTextArea ? (
        <div
          className="flex border-t-2 border-gray-200 hover:border-gray-400 focus:outline-none"
          ref={containerRef}
        >
          <HiMinus className="mt-2 text-xl" />
          <textarea
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="mt-2 text-gray-600 border-none rounded-lg resize-none focus:outline-none focus:shadow-outline"
            rows="1"
            placeholder="Enter new todo..."
          />
        </div>
      ) : (
        <div
          className="flex text-gray-300 border-t-2 border-gray-200 cursor-pointer hover:text-gray-600 hover:border-gray-400 focus:outline-none"
          onClick={() => setShowTextArea(true)}
        >
          <HiPlus className="mt-2 text-xl " />
          <span className="mt-2 ">Add New Todo</span>
        </div>
      )}
    </>
  );
};

export default ToggleInput;

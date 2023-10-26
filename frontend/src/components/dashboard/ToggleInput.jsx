import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";

const ToggleInput = ({ onAddTodo, columnId }) => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleTextArea = () => {
    setShowTextArea(!showTextArea);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      onAddTodo(columnId, inputValue);

      setInputValue("");
      setShowTextArea(false);
    }
  };

  return (
    <>
      {showTextArea ? (
        <textarea
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          rows="3"
          placeholder="Enter new todo..."
        />
      ) : (
        <div
          className="flex border-t-2 border-gray-200 hover:border-gray-400 focus:outline-none cursor-pointer"
          onClick={toggleTextArea}
        >
          <HiPlus />
          <button className="ml-2 text-gray-600 focus:outline-none">
            Add New Todo
          </button>
        </div>
      )}
    </>
  );
};

export default ToggleInput;

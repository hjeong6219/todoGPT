import { HiPlus } from "react-icons/hi";

function AddTodoButton({ setIsShowModal }) {
  return (
    <div className="relative w-full">
      <div className="absolute bottom-0 left-0 right-0 w-full mx-auto max-w-screen-2xl items-place-end">
        <button className="absolute p-4 text-white transition-transform duration-200 transform bg-blue-600 rounded-full shadow-lg hover:scale-105 right-12 bottom-12 hover:bg-blue-700 focus:outline-none">
          <HiPlus onClick={() => setIsShowModal(true)} />
        </button>
      </div>
    </div>
  );
}

export default AddTodoButton;

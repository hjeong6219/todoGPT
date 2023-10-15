import { HiOutlineSave, HiX } from "react-icons/hi";

function EditorButton({ type, onClick }) {
  return (
    <button
      type="reset"
      className="inline-flex px-2 ml-2 text-2xl text-stone-400 focus:outline-none hover:text-stone-700"
      onClick={onClick}
    >
      {type === "submit" ? <HiOutlineSave /> : <HiX />}
    </button>
  );
}

export default EditorButton;

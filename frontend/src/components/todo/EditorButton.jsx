import { HiX } from "react-icons/hi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

function EditorButton({ type, onClick }) {
  return (
    <button
      type={type}
      className="inline-flex px-2 ml-2 text-2xl text-stone-400 focus:outline-none hover:text-stone-700"
      onClick={onClick}
    >
      {type === "menu" ? <HiAdjustmentsHorizontal /> : <HiX />}
    </button>
  );
}

export default EditorButton;

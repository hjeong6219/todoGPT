"use client";
import { ImSpinner2 } from "react-icons/im";

function Loader({ children }) {
  return (
    <button className="flex p-4" disabled>
      <ImSpinner2 className="animate-spin mr-4 text-5xl" />
      <p className=" text-5xl">{children}</p>
    </button>
  );
}

export default Loader;

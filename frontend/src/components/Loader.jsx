"use client";
import { ImSpinner2 } from "react-icons/im";

function Loader() {
  return (
    <button class="shadow-lg rounded-md flex p-4" disabled>
      <ImSpinner2 className="animate-spin mr-4 text-4xl" />
      <p className=" text-4xl">Loading...</p>
    </button>
  );
}

export default Loader;

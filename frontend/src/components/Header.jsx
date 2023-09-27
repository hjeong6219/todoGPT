import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-center gap-4 pt-20 pb-4 mx-auto text-2xl border-b-2 w-60">
      <ul className="flex gap-4">
        <li>
          <NavLink
            to="/todo"
            className="cursor-pointer text-stone-200 hover:text-stone-700 focus:text-stone-700 aria-[current=page]:text-stone-700"
          >
            Todo
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/calendar"
            className="cursor-pointer text-stone-200 hover:text-stone-700 focus:text-stone-700 aria-[current=page]:text-stone-700"
          >
            Calendar
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;

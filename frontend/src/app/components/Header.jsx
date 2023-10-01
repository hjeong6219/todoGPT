import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-center gap-4 pt-20 pb-4 mx-auto text-2xl border-b-2 w-60">
      <ul className="flex gap-4">
        <li>
          <Link
            href="/todos"
            className="cursor-pointer text-stone-200 hover:text-stone-700 focus:text-stone-700 aria-current:text-stone-700"
          >
            Todo
          </Link>
        </li>
        <li>
          <Link
            href="/calendar"
            className="cursor-pointer text-stone-200 hover:text-stone-700 focus:text-stone-700 aria-current:text-stone-700"
          >
            Calendar
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;

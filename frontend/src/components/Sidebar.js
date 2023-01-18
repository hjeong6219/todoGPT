import Link from "./Link";

function Sidebar() {
  const links = [
    { label: "Welcome", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Todo", path: "/todo" },

  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="mb-3"
        activeClassName="font-bold border-l-4 border-blue-500 pl-2"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="sticky left-0 top-0 overflow-auto flex flex-col items-start">
      {renderedLinks}
    </div>
  );
}

export default Sidebar;

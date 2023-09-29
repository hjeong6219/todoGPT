import Header from "../components/Header";

function AppLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default AppLayout;

function WelcomeMessage({ user }) {
  return (
    <section className="p-4 mb-6 bg-white border-2 border-blue-200 rounded shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 ">
        Welcome back, {user.fullName.split(" ")[0]}!
      </h2>
    </section>
  );
}

export default WelcomeMessage;

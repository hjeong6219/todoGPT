function Title({ todoTitle }) {
  return (
    <textarea
      className="z-50 block w-full h-12 px-4 pt-2 text-2xl border-b-2 resize-none shadow-top-lg rounded-xl no-scrollbar focus:outline-none bg-stone-200 text-stone-900"
      type="text"
      name="title"
      defaultValue={todoTitle}
      placeholder="Enter your title here"
      required
    />
  );
}

export default Title;

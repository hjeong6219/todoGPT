function Title({ todoTitle, setTodoTitle }) {
  console.log(todoTitle);
  return (
    <textarea
      className="z-50 block w-full h-12 px-4 pt-2 text-2xl border-b-2 resize-none shadow-top-lg rounded-xl no-scrollbar focus:outline-none bg-stone-200 text-stone-900"
      type="text"
      value={todoTitle}
      onChange={(event) => setTodoTitle(event.target.value)}
      placeholder="Enter your title here"
    />
  );
}

export default Title;

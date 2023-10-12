function TodoInput({ setTodoTitle, handleKeyDown }) {
  return (
    <input
      className="block w-2/5 h-12 max-w-screen-lg px-4 mx-auto mt-5 shadow-md focus:outline-none focus:ring focus:ring-stone-200 bg-gradient-to-r from-stone-100 to-stone-200 text-stone-900 rounded-3xl"
      placeholder="What would you like to do?"
      onChange={(event) => setTodoTitle(event.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default TodoInput;

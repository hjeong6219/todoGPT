import TodoTile from "./TodoTile";

function TodosDueCard({ title, todos, expandedTodo, setExpandedTodo }) {
  let borderColor = "border-blue-200";
  if (title.includes("today")) borderColor = "border-blue-300";
  if (title.includes("following week")) borderColor = "border-green-300";

  return (
    <section
      className={`p-4 mb-6 bg-gray-100 border-2 ${borderColor} rounded shadow-lg`}
    >
      <h4 className="text-lg font-bold text-gray-700">{title}</h4>
      <div className="pt-3 text-gray-600">
        <ul>
          {todos.length > 0 ? (
            <TodoTile
              todos={todos}
              expandedTodo={expandedTodo}
              setExpandedTodo={setExpandedTodo}
            />
          ) : (
            <p>No tasks scheduled.</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default TodosDueCard;

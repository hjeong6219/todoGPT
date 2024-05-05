import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

function TodoTile({ todos, handleToggleTodo, expandedTodo }) {
  return todos.map((todo, i) => {
    const isExpanded = expandedTodo === todo.id;

    return (
      <div
        key={"todo" + i}
        className={`flex flex-col gap-2 px-4 py-1 mb-3 bg-white border-l-4 ${
          todo.priority === "low"
            ? "border-blue-500"
            : todo.priority === "medium"
            ? "border-yellow-500"
            : todo.priority === "high"
            ? "border-red-500"
            : ""
        } rounded shadow cursor-pointer`}
        onClick={() => handleToggleTodo(todo.id)}
      >
        <h1
          className={`text-lg font-semibold pt-1 ${
            todo.status === "completed" ? "line-through" : ""
          }`}
        >
          {todo.title}
        </h1>
        {todo.content && (
          <div
            className={`transition-all duration-300 ease-in-out text-gray-600 overflow-hidden ${
              isExpanded ? "max-h-32 border-t-2 pt-2 mb-2  " : "max-h-0"
            }`}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {todo.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    );
  });
}

export default TodoTile;

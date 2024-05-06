import TodoTile from "../dashboard/TodoTile";
import { useState } from "react";

function ScheduleDisplay({ selectedDate, todosDueThisDate, today }) {
  const [expandedTodo, setExpandedTodo] = useState(false);

  const handleToggleTodo = (todoId) => {
    if (expandedTodo === todoId) {
      setExpandedTodo(null);
    } else {
      setExpandedTodo(todoId);
    }
  };
  return (
    <div className="px-5 pt-8 overflow-y-auto h-fit w-96 md:w-fill md:pt-16 md:h-96 xl:h-4/5">
      <h1 className="mb-4 font-semibold xl:text-xl">
        Schedule for {selectedDate.format("MMMM D, YYYY")}
      </h1>
      <div className="text-gray-600">
        {selectedDate.isSame(today, "day") && todosDueThisDate.length === 0 ? (
          <p className="text-lg text-gray-700">No tasks for today.</p>
        ) : !selectedDate.isSame(today, "day") &&
          todosDueThisDate.length === 0 ? (
          <p className="text-lg text-gray-700">
            No tasks scheduled for this date.
          </p>
        ) : (
          <ul>
            <TodoTile
              todos={todosDueThisDate}
              handleToggleTodo={handleToggleTodo}
              expandedTodo={expandedTodo}
            />
          </ul>
        )}
      </div>
    </div>
  );
}

export default ScheduleDisplay;

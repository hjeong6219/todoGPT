function TodaysOverview({
  todosDueToday,
  completedTodosDueToday,
  incompleteTodosDueToday,
}) {
  return (
    <div className="mt-6 mb-4">
      <div className="p-6 bg-white border-2 rounded-lg shadow-lg md:text-xl border-gray-50">
        <h4 className="mb-4 font-bold text-gray-600">Today's Overview</h4>
        {todosDueToday > 0 && todosDueToday === completedTodosDueToday ? (
          <p className="text-lg text-gray-700">
            All todos completed for today!
          </p>
        ) : todosDueToday === 0 ? (
          <p className="text-lg text-gray-700">There are no tasks for today.</p>
        ) : (
          <p className="text-lg text-gray-700">
            You have
            <span className="font-bold text-blue-600">
              {" " + incompleteTodosDueToday + " "}
            </span>
            tasks remaining out of
            <span className="font-bold text-blue-600">
              {" " + (completedTodosDueToday + incompleteTodosDueToday) + " "}
            </span>
            tasks today.
          </p>
        )}
      </div>
    </div>
  );
}

export default TodaysOverview;

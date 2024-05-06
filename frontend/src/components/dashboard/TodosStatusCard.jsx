function TodosStatusCard({ title, count }) {
  let borderColor = "border-blue-200";
  if (title === "In Progress") borderColor = "border-yellow-200";
  if (title === "Completed") borderColor = "border-green-200";

  return (
    <div className={`p-4 bg-white border-2 ${borderColor} rounded shadow-lg`}>
      <h3 className="text-lg font-bold text-gray-700">{title}</h3>
      <p className="text-gray-600">
        {count > 0
          ? `${count} todo(s) ${
              title === "To-Do"
                ? "that needs to be addressed"
                : title === "In Progress"
                ? "you are currently working on"
                : "you have completed. Well done!"
            }`
          : `There are no todos ${
              title === "To-Do"
                ? "to work on"
                : title === "In Progress"
                ? "in progress"
                : "completed"
            }.`}
      </p>
    </div>
  );
}

export default TodosStatusCard;

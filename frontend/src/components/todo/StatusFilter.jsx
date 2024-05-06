function StatusFilter({ setTodoStatus }) {
  return (
    <div className="relative col-start-1 md:col-start-3 justify-self-end">
      <label htmlFor="status-filter" className="mr-2">
        Filter by status:{" "}
      </label>
      <select
        id="status-filter"
        onChange={(e) => dispatch(setTodoStatus(e.target.value))}
      >
        <option value="all">All</option>
        <option value="notStarted">Not Started</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default StatusFilter;

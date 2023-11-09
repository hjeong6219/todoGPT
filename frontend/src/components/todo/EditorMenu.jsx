function EditorMenu() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <label className="font-bold">Category:</label>
        <select className="border border-gray-300 rounded-md">
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <label className="font-bold">Priority:</label>
        <select className="border border-gray-300 rounded-md">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <label className="font-bold">Status:</label>
        <select className="border border-gray-300 rounded-md">
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <label className="font-bold">Due Date:</label>
        <input type="date" className="border border-gray-300 rounded-md" />
      </div>
      {/* Add more items as needed */}
    </div>
  );
}

export default EditorMenu;

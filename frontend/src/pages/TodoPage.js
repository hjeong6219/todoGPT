import { useState } from "react";

function TodoPage() {
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setContent('');
  };

  return (
    <div className="container h-96 mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={content} />
        </form>
        <p className="text-gray-500 ///text-lg">
          React and Tailwind CSS in action
        </p>
      </div>
    </div>
  );
}
export default TodoPage;

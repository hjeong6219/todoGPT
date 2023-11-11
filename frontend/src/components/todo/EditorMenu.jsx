import { updateCurrentTodo } from "@/app/features/todo/todoSlice";
import { useUpdateTodoMutation } from "@/app/features/todo/todosApi";
import dayjs from "dayjs";
import { useState } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import React from "react";
import toast from "react-hot-toast";

function EditorMenu({ isMenuOpen, todo }) {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(todo.category || []);
  const [updateTodo] = useUpdateTodoMutation();
  const dispatch = useDispatch();
  const notify = () => toast("Here is your toast.");

  const handleUpdateTodo = async (option, value) => {
    const timestamp = dayjs().valueOf();
    const { data, error } = await updateTodo({
      _id: todo._id,
      [option]: value,
      updatedAt: timestamp,
    });
    console.log("updating value: ", value);
    dispatch(
      updateCurrentTodo({
        _id: todo._id,
        [option]: value,
        updatedAt: timestamp,
      })
    );

    if (data) {
      toast.success(option + " has been updated!");
    }
    if (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      className={`z-50 relative right-0 p-4 w-2/5 2xl:w-1/4 h-full overflow-y-auto rounded-br-xl shadow-lg no-scrollbar bg-stone-50 focus:outline-nonetransform transition-transform  ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex-col">
        <div
          className={`grid grid-cols-1 px-4 py-1  md:text-lg ${
            categories.length < 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
          }`}
        >
          <label className="font-bold">Category:</label>

          {categories.length < 1 && (
            <input
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
              placeholder="Add a category"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (newCategory !== "") {
                    setCategories([...categories, newCategory]);
                    setNewCategory("");
                    handleUpdateTodo("category", categories);
                  }
                }
              }}
              className="max-w-xs min-w-0 px-1 rounded-md resize-none focus:bg-stone-200 bg-stone-50 hover:bg-stone-200 focus:outline-none"
            />
          )}
          <div className="flex flex-row flex-wrap gap-2 ">
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <input
                  value={category}
                  onChange={(e) => {
                    const newCategories = [...categories];
                    newCategories[index] = e.target.value;
                    setCategories(newCategories);
                  }}
                  onBlur={(e) => {
                    if (categories[index] === "") {
                      const updatedCategories = categories.filter(
                        (_, i) => i !== index
                      );
                      setCategories(updatedCategories);
                      handleUpdateTodo("category", updatedCategories);
                    } else {
                      handleUpdateTodo("category", categories);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (categories[index] === "") {
                        const updatedCategories = categories.filter(
                          (_, i) => i !== index
                        );
                        setCategories(updatedCategories);
                        handleUpdateTodo("category", updatedCategories);
                      } else {
                        handleUpdateTodo("category", categories);
                      }
                    }
                  }}
                  className="w-32 px-1 mt-1 border-2 rounded-md resize-none min-w-8 focus:border-stone-200 bg-stone-100 focus:bg-stone-200 hover:bg-stone-200 focus:outline-stone-300"
                />
                {index === categories.length - 1 && (
                  <div
                    className="self-center cursor-pointer text-stone-400 hover:text-stone-700"
                    onClick={() => setCategories([...categories, ""])}
                  >
                    <HiPlusSmall />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 px-4 py-1 md:text-lg lg:grid-cols-2 ">
          <label className="font-bold">Priority:</label>
          <select
            className="w-32 border-none rounded-md md:w-36 bg-stone-50 hover:bg-stone-200 focus:outline-none"
            value={todo.priority}
            onChange={(e) => handleUpdateTodo("priority", e.target.value)}
          >
            <option className="bg-stone-50" value="">
              None
            </option>
            <option className="bg-stone-50" value="high">
              High
            </option>
            <option className="bg-stone-50" value="medium">
              Medium
            </option>
            <option className="bg-stone-50" value="low">
              Low
            </option>
          </select>
        </div>

        <div className="grid grid-cols-1 px-4 py-1 md:text-lg lg:grid-cols-2 ">
          <label className="font-bold">Status:</label>
          <select
            value={todo.status}
            onChange={(e) => handleUpdateTodo("status", e.target.value)}
            className="w-32 border-none rounded-md md:w-36 bg-stone-50 hover:bg-stone-200 focus:outline-none"
          >
            <option className="bg-stone-50" value="notStarted">
              Not Started
            </option>
            <option className="bg-stone-50" value="inProgress">
              In Progress
            </option>
            <option className="bg-stone-50" value="completed">
              Completed
            </option>
          </select>
        </div>
        <div className="grid grid-cols-1 px-4 py-1 border-b-2 border-stone-300 md:text-lg lg:grid-cols-2 ">
          <label htmlFor="date-picker" className="font-bold text-gray-700">
            Select a date:
          </label>
          <input
            type="date"
            id="date-picker"
            className="left-0 w-32 border-none rounded-md md:w-36 text-md hover:bg-stone-200 bg-stone-50 form-input focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={
              todo.dueDate
                ? dayjs(todo.dueDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              handleUpdateTodo("dueDate", new dayjs(e.target.value).valueOf());
            }}
          />
        </div>
      </div>
      <div className="items-center pt-2 text-sm lg:pt-4 md:text-md">
        <div className="font-bold text-gray-400">
          Created{" "}
          <span>{dayjs(todo.createdAt).format("MM-DD-YYYY HH:mm:ss")}</span>
        </div>
        <div className="font-bold text-gray-400">
          Last Updated{" "}
          <span>{dayjs(todo.updatedAt).format("MM-DD-YYYY HH:mm:ss")}</span>
        </div>
      </div>
    </div>
  );
}

export default EditorMenu;

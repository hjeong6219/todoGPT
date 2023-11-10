import { updateCurrentTodo } from "@/app/features/todo/todoSlice";
import { useUpdateTodoMutation } from "@/app/features/todo/todosApi";
import dayjs from "dayjs";
import { useState } from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useDispatch } from "react-redux";

function EditorMenu({ isMenuOpen, todo }) {
  const [updateTodo] = useUpdateTodoMutation();
  const dispatch = useDispatch();

  const handleUpdateTodo = async (option, value) => {
    const timestamp = dayjs().valueOf();
    const { data, error } = await updateTodo({
      _id: todo._id,
      [option]: value,
      updatedAt: timestamp,
    });
    console.log(value);
    dispatch(
      updateCurrentTodo({
        _id: todo._id,
        [option]: value,
        updatedAt: timestamp,
      })
    );

    if (data) {
      console.log("data", data);
    }
    if (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      className={`z-50 relative right-0 p-4 w-2/5 2xl:w-1/4 h-full overflow-y-hidden rounded-br-xl shadow-lg no-scrollbar bg-stone-50 focus:outline-nonetransform transition-transform  ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="grid grid-cols-1 gap-2 px-4 py-2 border-b-2 border-gray-400 lg:gap-4 lg:py-4 md:text-lg lg:grid-cols-2 ">
        <label className="font-bold">Category:</label>
        <select className="w-32 border-none rounded-md md:w-36 bg-stone-50 hover:bg-stone-200 focus:outline-none">
          <option className="bg-stone-50" value="work">
            Work
          </option>
          <option className="bg-stone-50" value="personal">
            Personal
          </option>
        </select>
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
        <label htmlFor="date-picker" className="font-bold text-gray-700">
          Select a date:
        </label>
        <input
          type="date"
          id="date-picker"
          className="left-0 w-32 text-gray-700 border-none rounded-md md:w-36 text-md hover:bg-stone-200 bg-stone-50 form-input focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={
            todo.dueDate ? dayjs(todo.dueDate).toISOString().split("T")[0] : ""
          }
          onChange={(e) => {
            handleUpdateTodo("dueDate", new dayjs(e.target.value).valueOf());
          }}
        />
      </div>
      <div className="flex-col items-center pt-2 text-sm lg:pt-4 md:text-md xl:flex-row">
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

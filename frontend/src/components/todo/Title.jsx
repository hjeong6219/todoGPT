import { setCurrentTodo } from "@/app/features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function Title({ todo }) {
  const currentTodo = useSelector((state) => state.todoSlice.currentTodo);
  const dispatch = useDispatch();

  return (
    <input
      className="z-50 block w-full h-10 px-4 text-3xl resize-none no-scrollbar focus:outline-none bg-stone-200 text-stone-900"
      type="text"
      name="title"
      value={currentTodo.title}
      onChange={(e) =>
        dispatch(setCurrentTodo({ ...todo, title: e.target.value }))
      }
      placeholder="Enter your title here"
      required
    />
  );
}

export default Title;

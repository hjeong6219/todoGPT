"use client";
import KanbanBoard from "@/components/todo/KanbanBoard";
import Navbar from "@/components/todo/Navbar";
import SearchBar from "@/components/todo/SearchBar";
import { HiPlus } from "react-icons/hi";
import { useGetUserByEmailQuery } from "../../app/features/user/usersApi";
import { useEffect, useState } from "react";
import { useGetTodosByUserIdQuery } from "@/app/features/todo/todosApi";
import Modal from "../Modal";
import TodoWrapper from "./TodoWrapper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import TodoSkeleton from "./TodoSkeleton";
import { setCurrentTodo, setTodo } from "@/app/features/todo/todoSlice";
import { setUser } from "@/app/features/user/userSlice";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import sortTodos from "@/utilities/sortTodos";

function Dashboard() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const {
    data: userData,
    isLoading: isLoadingUser,
    error,
  } = useGetUserByEmailQuery(session?.user?.email, {
    skip: !session?.user,
  });

  // Redirects to auth-callback if user does not exist in database
  useEffect(() => {
    if (
      session?.user != undefined &&
      error?.data?.message == "User does not exist."
    ) {
      redirect(
        "/auth-callback?origin=todos&userEmail=" +
          session?.user?.email +
          "&userName=" +
          session?.user?.name
      );
    }
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, error]);

  const { data: todoData, isLoading: isLoadingTodos } =
    useGetTodosByUserIdQuery(
      { userId: userData?._id, page: "board", sort: "Name", order: "asc" },
      {
        skip: !userData,
      }
    );

  const todos = useSelector((state) => state.todoSlice.columns);
  const todoStatus = useSelector((state) => state.todoSlice.todoStatus);
  const todoSearch = useSelector((state) => state.todoSlice.todoSearch);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleShowTodo = (todo) => {
    dispatch(setCurrentTodo(todo));
    setIsShowModal(true);
  };

  useEffect(() => {
    if (todoData) {
      const sortedTodos = sortTodos(todoData, todoStatus, todoSearch);
      dispatch(setTodo(sortedTodos));
    }
  }, [todoData, todoStatus, todoSearch]);

  const generateTodo = async () => {
    try {
      const addTodoResponse = await addTodo({
        userId: userData._id,
        title: todoTitle,
        userEmail: userData.email,
      });
      setCurrentTodo(addTodoResponse.data);
      try {
        const addChatResponse = await addChat({
          todoId: addTodoResponse.data._id,
          sender: "ai",
          content: "Hi there! How can I help you?",
        });
        setShowTodo(true);
      } catch (error) {
        console.error("Failed to add chat");
      }
    } catch (error) {
      console.error("Failed to add todo");
    }
  };

  let today = new Date();
  let completedTodosDueToday = 0;
  let incompleteTodosDueToday = 0;
  let todosDueToday = 0;

  todos.forEach((column) => {
    column.todos.forEach((todo) => {
      let todoDueDate = new Date(todo.dueDate);
      if (todoDueDate.getDate() === today.getDate()) {
        todosDueToday++;
        if (todo.status === "completed") {
          completedTodosDueToday++;
        } else {
          incompleteTodosDueToday++;
        }
      }
    });
  });

  return (
    <>
      {isLoadingUser || status === "loading" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loader>Loading User Data...</Loader>
        </div>
      ) : (
        <div className="leading-normal text-gray-900 bg-gray-100">
          {isShowModal && (
            <Modal>
              <TodoWrapper setIsShowModal={setIsShowModal} />
            </Modal>
          )}
          <div className={`flex w-full h-screen ${isShowModal && "blur-md"}`}>
            <Navbar />
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-50">
                <div className="container right-0 px-6 py-8 mx-auto max-w-screen-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-medium text-gray-700">
                      Planner
                    </h3>
                    <SearchBar />
                  </div>
                  <div className="mt-6 mb-4">
                    <div className="p-6 bg-white border-2 rounded-lg shadow-lg md:text-xl border-gray-50">
                      <h4 className="mb-4 font-bold text-gray-600">
                        Today's Overview
                      </h4>
                      {todosDueToday > 0 &&
                      todosDueToday === completedTodosDueToday ? (
                        <p className="text-lg text-gray-700">
                          All todos completed for today!
                        </p>
                      ) : todosDueToday === 0 ? (
                        <p className="text-lg text-gray-700">
                          There are no tasks for today.
                        </p>
                      ) : (
                        <p className="text-lg text-gray-700">
                          You have
                          <span className="font-bold text-blue-600">
                            {" " + incompleteTodosDueToday + " "}
                          </span>
                          tasks remaining out of
                          <span className="font-bold text-blue-600">
                            {" " +
                              (completedTodosDueToday +
                                incompleteTodosDueToday) +
                              " "}
                          </span>
                          tasks today.
                        </p>
                      )}
                    </div>
                  </div>
                  {isLoadingTodos ? (
                    <TodoSkeleton />
                  ) : (
                    <KanbanBoard
                      user={userData}
                      todos={todos}
                      handleShowTodo={handleShowTodo}
                    />
                  )}
                </div>
              </main>
              <div className="relative w-full">
                <div className="absolute bottom-0 left-0 right-0 w-full mx-auto max-w-screen-2xl items-place-end">
                  <button className="absolute p-4 text-white transition-transform duration-200 transform bg-blue-600 rounded-full shadow-lg hover:scale-105 right-12 bottom-12 hover:bg-blue-700 focus:outline-none">
                    <HiPlus onClick={() => setIsShowModal(true)} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;

"use client";
import Alert from "@/components/dashboard/Alert";
import KanbanBoard from "@/components/dashboard/KanbanBoard";
import Navbar from "@/components/dashboard/Navbar";
import SearchBar from "@/components/dashboard/SearchBar";
import TodoList from "@/components/todo/TodoList";
import { HiPlus } from "react-icons/hi";
import { useGetUserByEmailQuery } from "../../app/features/todo/usersApi";
import { useEffect, useState } from "react";
import { useGetTodosByUserIdQuery } from "@/app/features/todo/todosApi";
import Modal from "../Modal";
import TodoWrapper from "../todo/TodoWrapper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import TodoSkeleton from "../todo/TodoSkeleton";
import { setCurrentTodo } from "@/app/features/todo/todoSlice";

function Dashboard({ user }) {
  const {
    data: userData,
    isLoading: isLoadingUser,
    error,
  } = useGetUserByEmailQuery(user.email);

  // Redirects to auth-callback if user does not exist in database
  useEffect(() => {
    if (error?.data?.message == "User does not exist.") {
      const fullName = user.given_name + " " + user.family_name;
      redirect(
        "/auth-callback?origin=todos&userEmail=" +
          user.email +
          "&userName=" +
          fullName
      );
    }
  }, [userData, error]);

  const dispatch = useDispatch();

  const { data: todoData, isLoading: isLoadingTodos } =
    useGetTodosByUserIdQuery(userData?._id, {
      skip: !userData,

      refetchOnMountOrArgChange: true,
    });

  console.log(todoData);

  const [isShowModal, setIsShowModal] = useState(false);

  const handleShowTodo = (todo) => {
    dispatch(setCurrentTodo(todo));
    setIsShowModal(true);
  };

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

  const totalTasks = 10;
  const tasksRemaining = 4;

  return (
    <>
      {isLoadingUser ? (
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
          <div className="flex w-full h-screen">
            <Alert />
            <Navbar />
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
                <div className="container right-0 px-6 py-8 mx-auto max-w-screen-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-medium text-gray-700">
                      TodoGPT
                    </h3>
                    <SearchBar />
                  </div>
                  <div className="mt-6 mb-4">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                      <h4 className="mb-4 font-bold text-gray-600">
                        Today's Overview
                      </h4>
                      <p className="text-lg text-gray-700 ">
                        You have
                        <span className="font-bold text-blue-600">
                          {" " + tasksRemaining + " "}
                        </span>
                        tasks remaining out of
                        <span className="font-bold text-blue-600">
                          {" " + totalTasks}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                  {isLoadingTodos ? (
                    <TodoSkeleton />
                  ) : (
                    <KanbanBoard
                      todos={todoData}
                      handleShowTodo={handleShowTodo}
                    />
                  )}

                  {/* <div className="mt-6 space-y-4">
                <h4 className="pt-4 mb-2 font-bold text-gray-600">
                  In Progress
                </h4>
                <div className="p-4 mb-2 bg-white rounded-md shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">My ongoing todo</span>
                    <button className="text-yellow-600 transition duration-200 hover:text-yellow-800">
                      Mark as done
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="mb-2 font-bold text-gray-600">Completed</h4>
                  <div className="p-4 mb-2 bg-white rounded-md shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 line-through">
                        My completed todo
                      </span>
                      <button className="text-green-600 transition duration-200 hover:text-green-800">
                        Undo
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
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

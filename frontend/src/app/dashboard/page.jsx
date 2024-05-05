"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/dashboard/Navbar";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { setUser } from "../features/user/userSlice";
import Weather from "@/components/dashboard/Weather";
import { useGetUserByEmailQuery } from "../features/user/usersApi";
import { useGetTodosByUserIdQuery } from "../features/todo/todosApi";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import TodoTile from "@/components/TodoTile";

function Page() {
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

  let todoCount = 0;
  let inProgressCount = 0;
  let completedCount = 0;
  let todosDueToday = [];
  let todosDueComingWeek = [];

  const [expandedTodo, setExpandedTodo] = useState(false);

  if (todoData) {
    todoCount =
      todoData.filter((column) => column.title === "Todo")[0]?.todos.length ||
      0;
    inProgressCount =
      todoData.filter((column) => column.title === "In Progress")[0]?.todos
        .length || 0;
    completedCount =
      todoData.filter((column) => column.title === "Completed")[0]?.todos
        .length || 0;

    todosDueToday = todoData
      .flatMap((column) => column.todos)
      .filter((todo) => {
        const dueDate = dayjs(todo.dueDate).startOf("day");
        return dueDate.isSame(dayjs().startOf("day"));
      });

    todosDueComingWeek = todoData
      .filter((column) => column.title !== "Completed")
      .flatMap((column) => column.todos)
      .filter((todo) => {
        const dueDate = dayjs(todo.dueDate).startOf("day");
        const today = dayjs().startOf("day");
        const oneWeekFromToday = dayjs().add(8, "day").startOf("day");
        return dueDate.isAfter(today) && dueDate.isBefore(oneWeekFromToday);
      });
  }

  const handleToggleTodo = (todoId) => {
    if (expandedTodo === todoId) {
      setExpandedTodo(null);
    } else {
      setExpandedTodo(todoId);
    }
  };

  if (status == "loading" || isLoadingUser || isLoadingTodos || !userData)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Loader>Loading the dashboard...</Loader>
      </div>
    );

  return (
    <div className="flex h-screen bg-stone-50">
      <div className="flex w-full h-screen">
        <Navbar />
        <div className="flex flex-col flex-1 h-screen overflow-hidden ">
          <main className="right-0 h-full mx-auto overflow-y-auto max-w-screen-2xl no-scrollbar">
            <section className="flex items-center justify-between px-4 py-8">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl font-medium text-gray-700">
                  Dashboard
                </h3>
              </div>
            </section>
            <section className="p-4 mb-6 bg-white border-2 border-blue-200 rounded shadow-lg">
              <h2 className="text-2xl font-bold text-gray-700 ">
                Welcome back, {userData.fullName.split(" ")[0]}!
              </h2>
            </section>
            <section className="p-4 mb-6 bg-white border-2 border-blue-200 rounded shadow-lg">
              <h2 className="text-xl font-bold text-gray-700 ">
                Message of the Day
              </h2>
              <p className="text-gray-600">
                "Keep your spirits high, tackle everything with enthusiasm!"
              </p>
            </section>

            <Weather />
            {todoData ? (
              <>
                <section className="mb-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="p-4 bg-white border-2 border-blue-200 rounded shadow-lg">
                      <h3 className="text-lg font-bold text-gray-700">To-Do</h3>
                      <p className="text-gray-600">
                        {todoCount > 0
                          ? `${todoCount} todo(s) that needs to be addressed.
                          `
                          : "There are no todos to work on."}
                      </p>
                    </div>

                    <div className="p-4 bg-white border-2 border-yellow-200 rounded shadow-lg">
                      <h3 className="text-lg font-bold text-gray-700">
                        In Progress
                      </h3>
                      <p className="text-gray-600">
                        {inProgressCount > 0
                          ? `${inProgressCount} todo(s) you are currently working on.`
                          : "There are no todos in progress."}
                      </p>
                    </div>

                    <div className="p-4 bg-white border-2 border-green-200 rounded shadow-lg">
                      <h3 className="text-lg font-bold text-gray-700">
                        Completed
                      </h3>
                      <p className="text-gray-600">
                        {completedCount > 0
                          ? `${completedCount} todo(s) you have completed. Well done!`
                          : "There are no completed todos."}
                      </p>
                    </div>
                  </div>
                </section>
                {todosDueToday.length > 0 || todosDueComingWeek.length > 0 ? (
                  <>
                    {todosDueToday.length > 0 ? (
                      <section className="p-4 mb-6 bg-white border-2 border-blue-200 rounded shadow-lg">
                        <h4 className="text-lg font-bold text-gray-700">
                          Tasks scheduled for today.
                        </h4>
                        <div className="text-gray-600">
                          <ul>
                            <TodoTile
                              todos={todosDueToday}
                              handleToggleTodo={handleToggleTodo}
                              expandedTodo={expandedTodo}
                            />
                          </ul>
                        </div>
                      </section>
                    ) : (
                      <section className="p-4 mb-6 bg-gray-100 border border-gray-200 rounded shadow-lg">
                        <h4 className="text-lg font-bold text-gray-700">
                          <p>No tasks scheduled for today.</p>
                        </h4>
                      </section>
                    )}

                    {todosDueComingWeek.length > 0 ? (
                      <section className="p-4 bg-white border-2 border-green-200 rounded shadow-lg">
                        <h4 className="text-lg font-bold text-gray-700">
                          Tasks scheduled for the following week.
                        </h4>
                        <div className="text-gray-600">
                          <ul>
                            <TodoTile
                              todos={todosDueComingWeek}
                              handleToggleTodo={handleToggleTodo}
                              expandedTodo={expandedTodo}
                            />
                          </ul>
                        </div>
                      </section>
                    ) : (
                      <section className="p-4 bg-gray-100 border border-gray-200 rounded shadow-lg">
                        <h4 className="text-lg font-bold text-gray-700">
                          <p>No tasks scheduled for the coming week.</p>
                        </h4>
                      </section>
                    )}
                  </>
                ) : (
                  <section className="p-4 mb-6 bg-white border-2 border-blue-200 rounded shadow-lg">
                    <h4 className="text-lg font-bold text-gray-700">
                      No tasks scheduled.
                    </h4>
                  </section>
                )}
              </>
            ) : (
              <>
                <section className="mb-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="h-20 rounded shadow-lg animate-pulse bg-slate-300"></div>
                    <div className="h-20 rounded shadow-lg animate-pulse bg-slate-300"></div>
                    <div className="h-20 rounded shadow-lg animate-pulse bg-slate-300"></div>
                  </div>
                </section>
                <section className="h-20 mb-6 rounded shadow-lg animate-pulse bg-slate-300" />
                <section className="h-20 mb-6 rounded shadow-lg animate-pulse bg-slate-300" />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Page;

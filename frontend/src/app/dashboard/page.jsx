"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/dashboard/Navbar";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import Weather from "@/components/dashboard/Weather";
import { useGetUserByEmailQuery } from "../features/user/usersApi";
import { useGetTodosByUserIdQuery } from "../features/todo/todosApi";
import dayjs from "dayjs";

function Page() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  if (session) {
    dispatch(setUser(session.user));
  }
  const {
    data: userData,
    isLoading: isLoadingUser,
    error,
  } = useGetUserByEmailQuery(session?.user?.email, {
    skip: !session?.user,
  });

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
      .filter((column) => column.title !== "Completed")
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

  if (status == "loading" || isLoadingUser)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Loader>Loading the dashboard...</Loader>
      </div>
    );

  return (
    <div className="flex h-screen bg-stone-50">
      <div className="flex h-screen">
        <Navbar />
      </div>
      <div className="flex-1 mx-auto overflow-hidden max-w-screen-2xl ">
        <main className="h-full p-4 overflow-y-auto no-scrollbar">
          <section className="flex items-center justify-between px-4 py-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-700">Dashboard</h1>
            </div>
          </section>
          <section className="p-4 mb-6 bg-white border-2 border-blue-200 rounded shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 ">
              Welcome back, {userData.fullName.split(" ")[0]}!
            </h2>
          </section>
          <h2 className="px-4 py-2 text-2xl font-bold text-gray-700">
            Message of the Day
          </h2>
          <section className="p-4 mb-6 bg-white border-2 border-blue-200 rounded shadow-lg">
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
                      {todoCount} todo(s) that needs to be addressed.
                    </p>
                  </div>

                  <div className="p-4 bg-white border-2 border-yellow-200 rounded shadow-lg">
                    <h3 className="text-lg font-bold text-gray-700">
                      In Progress
                    </h3>
                    <p className="text-gray-600">
                      {inProgressCount} todo(s) you are currently working on.
                    </p>
                  </div>

                  <div className="p-4 bg-white border-2 border-green-200 rounded shadow-lg">
                    <h3 className="text-lg font-bold text-gray-700">
                      Completed
                    </h3>
                    <p className="text-gray-600">
                      {completedCount} todo(s) you have completed. Well done!
                    </p>
                  </div>
                </div>
              </section>
              <section className="p-4 mb-6 bg-gray-100 border border-gray-200 rounded shadow-lg">
                {todosDueToday.length > 0 ? (
                  <>
                    <h4 className="text-lg font-bold text-gray-700">
                      Today's To-Dos
                    </h4>
                    <p className="text-gray-600">
                      Tasks scheduled for today. Stay focused!
                      <ul>
                        {todosDueToday.map((todo) => {
                          return <li>{todo.title}</li>;
                        })}
                      </ul>
                    </p>
                  </>
                ) : (
                  <h4 className="text-lg font-bold text-gray-700">
                    <p>No tasks scheduled for today.</p>
                  </h4>
                )}
              </section>
              <section className="p-4 bg-gray-100 border border-gray-200 rounded shadow-lg">
                {todosDueComingWeek.length > 0 ? (
                  <>
                    <h4 className="text-lg font-bold text-gray-700">
                      Upcoming To-Dos
                    </h4>
                    <p className="text-gray-600">
                      Here's what's lined up for you. Plan ahead!
                      <ul>
                        {todosDueComingWeek.map((todo) => {
                          return <li>{todo.title}</li>;
                        })}
                      </ul>
                    </p>
                  </>
                ) : (
                  <h4 className="text-lg font-bold text-gray-700">
                    <p>No tasks scheduled for the coming week.</p>
                  </h4>
                )}
              </section>
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
  );
}

export default Page;

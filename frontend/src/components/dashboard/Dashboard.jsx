"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { setUser } from "@/app/features/user/userSlice";
import Weather from "@/components/dashboard/Weather";
import { useGetUserByEmailQuery } from "@/app/features/user/usersApi";
import { useGetTodosByUserIdQuery } from "@/app/features/todo/todosApi";
import dayjs from "dayjs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeMessage from "@/components/dashboard/WelcomeMessage";
import MotivationalMessage from "@/components/dashboard/MotivationalMessage";
import TodosStatusCard from "@/components/dashboard/TodosStatusCard";
import TodosDueCard from "@/components/dashboard/TodosDueCard";
import DashboardSekeleton from "@/components/dashboard/DashboardSekeleton";

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
            <DashboardHeader />
            <WelcomeMessage user={userData} />
            <MotivationalMessage />
            <Weather />
            {todoData ? (
              <>
                <section className="mb-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <TodosStatusCard title="To-Do" count={todoCount} />
                    <TodosStatusCard
                      title="In Progress"
                      count={inProgressCount}
                    />
                    <TodosStatusCard title="Completed" count={completedCount} />
                  </div>
                </section>
                {todosDueToday.length > 0 || todosDueComingWeek.length > 0 ? (
                  <>
                    {todosDueToday.length > 0 ? (
                      <TodosDueCard
                        title="Tasks scheduled for today."
                        todos={todosDueToday}
                        setExpandedTodo={setExpandedTodo}
                        expandedTodo={expandedTodo}
                      />
                    ) : null}

                    {todosDueComingWeek.length > 0 ? (
                      <TodosDueCard
                        title="Tasks scheduled for the following week."
                        todos={todosDueComingWeek}
                        setExpandedTodo={setExpandedTodo}
                        expandedTodo={expandedTodo}
                      />
                    ) : null}
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
                <DashboardSekeleton />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

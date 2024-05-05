"use client";
import { useGetTodosByUserIdQuery } from "@/app/features/todo/todosApi";
import {
  generateDate,
  weekdays,
  months,
  getTodosByDate,
} from "@/utilities/calendar";
import cn from "@/utilities/cn";
import dayjs from "dayjs";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Navbar from "@/components/todo/Navbar";
import Loader from "./Loader";
import { useGetUserByEmailQuery } from "@/app/features/user/usersApi";
import { useSession } from "next-auth/react";
import TodoTile from "./dashboard/TodoTile";

function Calendar() {
  const { data: session, status } = useSession();
  const {
    data: userData,
    isLoading: isLoadingUser,
    error,
  } = useGetUserByEmailQuery(session?.user?.email, {
    skip: !session?.user,
  });

  const { data: todos, isLoading: isLoadingTodos } = useGetTodosByUserIdQuery(
    { userId: userData?._id, page: "calendar", sort: "name", order: "asc" },
    {
      skip: !userData,
    }
  );

  const today = dayjs();
  const [date, setDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [expandedTodo, setExpandedTodo] = useState(false);

  const handleSelectedDate = (date, i, isCurrentMonth) => {
    if (isCurrentMonth === "last") {
      setDate(date.subtract(0, "month"));
    } else if (isCurrentMonth === "next") {
      setDate(date.add(0, "month"));
    }
    setSelectedDate(date);
  };

  const handleToggleTodo = (todoId) => {
    if (expandedTodo === todoId) {
      setExpandedTodo(null);
    } else {
      setExpandedTodo(todoId);
    }
  };

  const todosDueThisDate = getTodosByDate(todos, selectedDate);

  return (
    <>
      {isLoadingTodos ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loader>Loading Calendar...</Loader>
        </div>
      ) : (
        <div className="flex w-full h-screen bg-gray-50">
          <Navbar />
          <div className="flex flex-col items-center w-full pt-8 h-content md:justify-center max-h-min md:px-16 md:items-start md:flex-row">
            <div className="max-w-screen-xl md:pr-4 md:border-r-2 border-stone-400 md:py-auto w-96 h-fit md:w-3/4 ">
              <p className="pb-8 text-md md:text-3xl">Calendar</p>
              <div className="flex justify-between">
                <h1 className="font-semibold xl:text-3xl">
                  {months[date.month()]}, {date.year()}
                </h1>
                <div className="flex items-center gap-5">
                  <HiChevronLeft
                    className="w-5 h-5 cursor-pointer xl:h-10 xl:w-10"
                    onClick={() => {
                      setDate(date.subtract(1, "month"));
                    }}
                  />
                  <h1
                    className="cursor-pointer xl:text-xl "
                    onClick={() => {
                      setDate(today);
                    }}
                  >
                    Today
                  </h1>
                  <HiChevronRight
                    className="w-5 h-5 cursor-pointer xl:h-10 xl:w-10"
                    onClick={() => {
                      setDate(date.add(1, "month"));
                    }}
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-7 xl:pt-8 text-stone-500">
                {weekdays.map((day, i) => {
                  return (
                    <h1
                      key={"weekday" + i}
                      className="grid text-sm xl:text-xl place-content-center h-14"
                    >
                      {day}
                    </h1>
                  );
                })}
              </div>
              <div className="grid w-full grid-cols-7">
                {generateDate(date.month(), date.year()).map(
                  ({ date, isCurrentMonth, isToday, isWeekend }, i) => {
                    return (
                      <div
                        key={"day" + i}
                        className="relative grid h-14 xl:h-28 place-content-center"
                      >
                        <h1
                          className={cn({
                            "h-10 w-10 xl:h-16 xl:w-16 xl:text-xl grid place-content-center rounded-full hover:bg-gray-800 hover:text-white transition-all cursor-pointer": true,
                            "text-gray-400": isCurrentMonth !== "current",
                            "text-red-600": isWeekend,
                            "bg-red-600 text-gray-200":
                              isToday && selectedDate.isSame(date, "day"),
                            "hover:bg-red-600  hover:text-white": isToday,
                            "bg-gray-800 text-white":
                              selectedDate.isSame(date, "day") && !isToday,
                          })}
                          onClick={() =>
                            handleSelectedDate(date, i, isCurrentMonth)
                          }
                        >
                          {date.date()}
                          {getTodosByDate(todos, date).length > 0 && (
                            <span
                              className={cn({
                                "absolute bottom-0 w-2 h-2 mb-1 transform -translate-x-1/2 xl:w-3 xl:h-3 xl:bottom-4 bg-red-600 rounded-full -translate-y-3/4 left-1/2": true,
                                "bg-white hover:bg-white":
                                  selectedDate.isSame(date, "day") && isToday,
                              })}
                            ></span>
                          )}
                        </h1>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="px-5 pt-8 overflow-y-auto h-fit w-96 md:w-fill md:pt-16 md:h-96 xl:h-4/5">
              <h1 className="mb-4 font-semibold xl:text-xl">
                Schedule for {selectedDate.format("MMMM D, YYYY")}
              </h1>
              <div className="text-gray-600">
                {selectedDate.isSame(today, "day") &&
                todosDueThisDate.length === 0 ? (
                  <p className="text-lg text-gray-700">No tasks for today.</p>
                ) : !selectedDate.isSame(today, "day") &&
                  todosDueThisDate.length === 0 ? (
                  <p className="text-lg text-gray-700">
                    No tasks scheduled for this date.
                  </p>
                ) : (
                  <ul>
                    <TodoTile
                      todos={todosDueThisDate}
                      handleToggleTodo={handleToggleTodo}
                      expandedTodo={expandedTodo}
                    />
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;

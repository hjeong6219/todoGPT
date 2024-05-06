"use client";
import { useGetTodosByUserIdQuery } from "@/app/features/todo/todosApi";
import { weekdays, getTodosByDate } from "@/utilities/calendar";
import dayjs from "dayjs";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Loader from "../Loader";
import { useGetUserByEmailQuery } from "@/app/features/user/usersApi";
import { useSession } from "next-auth/react";
import CalendarGrid from "./CalendarGrid";
import ScheduleDisplay from "./ScheduleDisplay";
import CalendarNavigation from "./CalendarNavigation";

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

  const handleSelectedDate = (date, i, isCurrentMonth) => {
    if (isCurrentMonth === "last") {
      setDate(date.subtract(0, "month"));
    } else if (isCurrentMonth === "next") {
      setDate(date.add(0, "month"));
    }
    setSelectedDate(date);
  };

  console.log(today);
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
              <CalendarNavigation
                date={date}
                setDate={setDate}
                today={today}
                setSelectedDate={setSelectedDate}
              />
              <div className="grid w-full grid-cols-7 xl:pt-8 text-stone-500">
                {weekdays.map((day, i) => (
                  <h1
                    key={"weekday" + i}
                    className="grid text-sm xl:text-xl place-content-center h-14"
                  >
                    {day}
                  </h1>
                ))}
              </div>
              <CalendarGrid
                date={date}
                todos={todos}
                handleSelectedDate={handleSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
            <ScheduleDisplay
              selectedDate={selectedDate}
              todosDueThisDate={todosDueThisDate}
              today={today}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Calendar;

"use client";
import { generateDate, weekdays, months } from "@/utilities/calendar";
import cn from "@/utilities/cn";
import dayjs from "dayjs";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Calendar() {
  const today = dayjs();
  const [date, setDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <div className="flex items-center justify-center w-full h-full gap-10 mt-5 divide-x-2">
      <div className=" w-96 h-96">
        <div className="flex justify-between">
          <h1 className="font-semibold">
            {months[date.month()]}, {date.year()}
          </h1>
          <div className="flex items-center gap-5">
            <HiChevronLeft
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setDate(date.subtract(1, "month"));
              }}
            />
            <h1
              className="cursor-pointer"
              onClick={() => {
                setDate(today);
              }}
            >
              Today
            </h1>
            <HiChevronRight
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setDate(date.add(1, "month"));
              }}
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-7 text-stone-500">
          {weekdays.map((day, i) => {
            return (
              <h1
                key={"weekday" + i}
                className="grid text-sm place-content-center h-14"
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className="grid w-full grid-cols-7">
          {generateDate(date.month(), date.year()).map(
            ({ date, isCurrentMonth, isToday }, i) => {
              return (
                <div key={"day" + i} className="grid h-14 place-content-center">
                  <h1
                    className={cn({
                      "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer": true,
                      "text-gray-400": isCurrentMonth !== "current",
                      "bg-red-600 text-gray-200":
                        isToday && selectedDate.isSame(date, "day"),
                      "hover:bg-red-600  hover:text-white": isToday,
                      "bg-black text-white":
                        selectedDate.isSame(date, "day") && !isToday,
                    })}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="px-5 h-96 w-96">
        <h1 className="font-semibold">
          Schedule for {selectedDate.toDate().toDateString()}
        </h1>
        <p>No meetings for date</p>
      </div>
    </div>
  );
}

export default Calendar;

import { generateDate } from "@/utilities/calendar";
import cn from "@/utilities/cn";
import { getTodosByDate } from "@/utilities/calendar";

function CalendarGrid({ date, todos, handleSelectedDate, selectedDate }) {
  return (
    <div className="grid w-full grid-cols-7">
      {generateDate(date.month(), date.year()).map(
        ({ date, isCurrentMonth, isToday, isWeekend }, i) => (
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
              onClick={() => handleSelectedDate(date, i, isCurrentMonth)}
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
        )
      )}
    </div>
  );
}

export default CalendarGrid;

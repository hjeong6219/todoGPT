import { months } from "@/utilities/calendar";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function CalendarNavigation({ date, setDate, today, setSelectedDate }) {
  return (
    <div className="flex justify-between">
      <h1 className="font-semibold xl:text-3xl">
        {months[date.month()]}, {date.year()}
      </h1>
      <div className="flex items-center gap-5">
        <HiChevronLeft
          className="w-5 h-5 cursor-pointer xl:h-10 xl:w-10"
          onClick={() => setDate(date.subtract(1, "month"))}
        />
        <h1
          className="cursor-pointer xl:text-xl"
          onClick={() => {
            setSelectedDate(today);
            setDate(today);
          }}
        >
          Today
        </h1>
        <HiChevronRight
          className="w-5 h-5 cursor-pointer xl:h-10 xl:w-10"
          onClick={() => setDate(date.add(1, "month"))}
        />
      </div>
    </div>
  );
}

export default CalendarNavigation;

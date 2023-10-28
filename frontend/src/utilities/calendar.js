import dayjs from "dayjs";

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDay = dayjs().month(month).year(year).startOf("month");
  const lastDay = dayjs().month(month).year(year).endOf("month");

  const days = [];

  for (let i = 0; i < firstDay.day(); i++) {
    days.push({ isCurrentMonth: "last", date: firstDay.day(i) });
  }

  for (let i = firstDay.date(); i <= lastDay.date(); i++) {
    const date = firstDay.date(i);
    const isWeekend = date.day() === 0 || date.day() === 6;
    days.push({
      isCurrentMonth: "current",
      date,
      isToday: date.isSame(dayjs(), "day"),
      isWeekend,
    });
  }

  const carryOver = 36 - days.length;

  for (let i = lastDay.date() + 1; i < lastDay.date() + carryOver; i++) {
    days.push({ isCurrentMonth: "next", date: firstDay.date(i) });
  }
  return days;
};
export const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

export const months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getTodosByDate = (todos, date) => {
  if (!todos) return [];
  return todos.filter((todo) =>
    dayjs(todo.dueDate, "MM-DD-YYYY").isSame(date, "day")
  );
};

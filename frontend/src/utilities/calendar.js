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
    days.push({
      isCurrentMonth: "current",
      date: firstDay.date(i),
      isToday: firstDay.date(i).isSame(dayjs(), "day"),
    });
  }

  const carryOver = 36 - days.length;

  for (let i = lastDay.date() + 1; i < lastDay.date() + carryOver; i++) {
    days.push({ isCurrentMonth: "next", date: firstDay.date(i) });
  }

  // for (let i = 1; i <= daysInMonth; i++) {
  //   days.push(dayjs().date(i));
  // }

  // for (let i = 0; i < 6 - lastDay; i++) {
  //   days.push(null);
  // }

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

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
class Calendar extends React.Component {
  render() {
    return <Calendar startAccessor="start" endAccessor="end" />;
  }
}
export default Calendar;

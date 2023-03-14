import React, { useContext } from "react";
import { CalendarDate, CaretUp } from "react-bootstrap-icons";
import { calendarItems } from "../constants";
import { TodoContext } from "../context";

function Calendar() {
  // Get the setSelectedProject function from the TodoContext
  const { setSelectedProject } = useContext(TodoContext);

  return (
    <div className="Calendar">
      <div className="header">
        {/* Display the calendar icon and title */}
        <div className="title">
          <CalendarDate size={18} />
          <p>Calendar</p>
        </div>
        {/* Display the caret up icon */}
        <div className="btns">
          <span>
            <CaretUp size={20} />
          </span>
        </div>
      </div>
      <div className="items">
        {/* Display the calendar items and set the selected project when clicked */}
        {calendarItems.map((item) => (
          <div
            className="item"
            key={item}
            onClick={() => setSelectedProject(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;

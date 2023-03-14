import moment from "moment";
import React, { useEffect, useState } from "react";
import Todo from "./todo";

function Next7Days({ todos }) {
  // Using useState to store the week's todos
  const [weekTodos, setWeekTodos] = useState([]);

  // Using useEffect to handle changes in the todos prop
  useEffect(() => {
    // An array of all the days of the week in string format
    const days = ["0", "1", "2", "3", "4", "5", "6"];

    // Sorting the todos by day of the week
    const sortedTodosByDay = days.map((day) => {
      return {
        // Getting all todos for the current day of the week
        todos: todos.filter((todo) => todo.day === day),
        // Storing the day of the week as a number for later use
        number: day,
      };
    });

    // Finding the index of today's date
    const today = parseInt(moment().format("d"));

    // Re-arranging the array so that it starts from today
    const arrangedDays = sortedTodosByDay
      .slice(today)
      .concat(sortedTodosByDay.slice(0, today));

    // Setting the state to the newly arranged array
    setWeekTodos(arrangedDays);
  }, [todos]);

  return (
    <div className="Next7Days">
      {/* Looping through the weekTodos array */}
      {weekTodos.map((day) => (
        <div key={day.number}>
          {/* Displaying the day name and the total number of todos for that day */}
          <div className="day">
            <div className="name">
              {moment(day.number, "d").format("dddd")}
              {/* Adding " (Today)" to the day name if it's today */}
              {day.number === moment().format("d") && " (Today)"}
            </div>
            <div className="total-todos">({day.todos.length})</div>
          </div>
          {/* Displaying all the todos for that day */}
          <div className="todos">
            {day.todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Exporting the component
export default Next7Days;

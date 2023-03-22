import moment from "moment";
import React, { useContext, useState } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import { TodoContext } from "../context";
import firebase from "../firebase";

function Todo({ todo }) {
  // Context
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  // State variable to keep track of whether the mouse is hovering over the Todo
  const [hover, setHover] = useState(false);

  const handleDelete = () => {
    deleteTodo(todo);

    if (selectedTodo === todo) {
      setSelectedTodo(undefined);
    }
  };

  // Function to delete the current Todo from the Firebase database
  const deleteTodo = () => {
    firebase.firestore().collection("todos").doc(todo.id).delete();
  };

  const checkTodo = () => {
    firebase.firestore().collection("todos").doc(todo.id).update({
      checked: !todo.checked,
    });
  };

  //  Function to repeat the current Todo for the next day
  const repeatNextDay = (todo) => {
    const nextDayDate = moment(todo.date, "DD/MM/YYYY").add(1, "days");

    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDayDate.format("DD/MM/YYYY"),
      day: nextDayDate.format("d"),
    };

    delete repeatedTodo.id;

    firebase.firestore().collection("todos").add(repeatedTodo);
  };

  return (
    <div
      className="Todo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="todo-container">
        {/* Display either a checked or unchecked Circle icon depending on the todo's checked status */}
        <div className="check-todo" onClick={() => checkTodo(todo)}>
          {todo.checked ? (
            <span className="checked">
              <CheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <Circle color={todo.color} />
            </span>
          )}
        </div>
        {/* Display the todo's text, time, and project name */}
        <div className="text" onClick={() => setSelectedTodo(todo)}>
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.projectName}
          </span>
          {/* Display a line through the text if the todo is checked */}
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        {/* Display an arrow icon if the todo is checked */}
        <div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>
        {/* Display a trash icon if the mouse is hovering over the Todo or if the Todo is checked */}
        <div className="delete-todo" onClick={() => handleDelete(todo)}>
          {(hover || todo.checked) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;

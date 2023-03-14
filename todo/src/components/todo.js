import React, { useState } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import firebase from "../firebase";

function Todo({ todo }) {
  // State variable to keep track of whether the mouse is hovering over the Todo
  const [hover, setHover] = useState(false);

  // Function to delete the current Todo from the Firebase database
  const deleteTodo = () => {
    firebase.firestore().collection("todos").doc(todo.id).delete();
  };

  return (
    <div
      className="Todo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="todo-container">
        {/* Display either a checked or unchecked Circle icon depending on the todo's checked status */}
        <div className="check-todo">
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
        <div className="text">
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
        <div className="add-to-next-day">
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>
        {/* Display a trash icon if the mouse is hovering over the Todo or if the Todo is checked */}
        <div className="delete-todo" onClick={() => deleteTodo(todo)}>
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

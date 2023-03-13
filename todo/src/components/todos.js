import React, { useContext } from "react";
import Next7Days from "./next7Days";
import Todo from "./todo";
import { TodoContext } from "../context";

function Todos() {
  const { todos, selectedProject } = useContext(TodoContext);

  return (
    <div className="Todos">
      <div className="selected-project">{selectedProject}</div>
      <div className="todos">
        {selectedProject === "next 7 days" ? (
          <Next7Days todos={todos} />
        ) : (
          todos.map((todo) => <Todo todo={todo} key={todo.id} />)
        )}
      </div>
    </div>
  );
}

export default Todos;

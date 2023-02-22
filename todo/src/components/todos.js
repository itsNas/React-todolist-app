import React from "react";
import Next7Days from "./next7Days";
import Todo from "./todo";

function Todos() {
  return (
    <div className="Todos">
      <Todo />
      <Next7Days />
    </div>
  );
}

export default Todos;

import React, { useState, useContext } from "react";
import TodoForm from "./todoForm";
import { TodoContext } from "../context";

function EditTodo() {
  // Context
  const { projects } = useContext(TodoContext);
  // State
  const [text, setText] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [todoProject, setTodoProject] = useState();

  function handleSubmit(e) {}
  return (
    <div className="EditTodo">
      <div className="header">Edit Todo</div>
      <div className="container">
        <TodoForm
          handleSubmit={handleSubmit}
          text={text}
          setText={setText}
          day={day}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
        />
      </div>
    </div>
  );
}

export default EditTodo;

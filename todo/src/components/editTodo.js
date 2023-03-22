import React, { useState, useContext, useEffect } from "react";
import TodoForm from "./todoForm";
import { TodoContext } from "../context";
import moment from "moment";
import firebase from "../firebase";

function EditTodo() {
  // STATE
  const [text, setText] = useState(""); // State for the todo text
  const [day, setDay] = useState(new Date()); // State for the selected day
  const [time, setTime] = useState(new Date()); // State for the selected time
  const [todoProject, setTodoProject] = useState(""); // State for the selected project

  // CONTEXT
  const { selectedTodo, projects } = useContext(TodoContext); // Accessing state variables from the context

  // Effect to update the state when the selectedTodo changes
  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date, "DD/MM/YYYY"));
      setTime(moment(selectedTodo.time, "hh:mm A"));
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);

  // Effect to update the todo item in the database when any of the state variables change
  useEffect(() => {
    if (selectedTodo) {
      firebase
        .firestore()
        .collection("todos")
        .doc(selectedTodo.id)
        .update({
          text,
          date: moment(day).format("DD/MM/YYYY"),
          day: moment(day).format("d"),
          time: moment(time).format("hh:mm A"),
          projectName: todoProject,
        });
    }
  }, [text, day, time, todoProject]);

  // Function to handle form submission
  function handleSubmit(e) {
    // To be implemented
  }

  return (
    <div>
      {selectedTodo && (
        <div className="EditTodo">
          <div className="header">Edit Todo</div>
          <div className="container">
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              projects={projects}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodo;

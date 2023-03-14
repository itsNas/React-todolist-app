import React, { useContext, useEffect, useState } from "react";
import Modal from "./modal";
import TodoForm from "./todoForm";
import { TodoContext } from "../context";
import { calendarItems } from "../constants";
import firebase from "../firebase";
import moment from "moment";
import randomcolor from "randomcolor";

function AddNewTodo() {
  // context
  const { selectedProject, projects } = useContext(TodoContext);

  // state
  const [showModal, setShowModal] = useState(false); // tracks whether the modal is currently displayed or not
  const [text, setText] = useState(""); // stores the text input value
  const [day, setDay] = useState(new Date()); // stores the selected day
  const [time, setTime] = useState(new Date()); // stores the selected time
  const [todoProject, setTodoProject] = useState(selectedProject); // stores the selected project

  // function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // prevent default form submission behavior

    // check if there is text input and the selected project is not a calendar item
    if (text && !calendarItems.includes(todoProject)) {
      firebase // access the Firestore database using the Firebase library
        .firestore()
        .collection("todos")
        .add({
          text: text, // text input value
          date: moment(day).format("DD.MM.YYYY"), // selected day formatted as a string
          day: moment(day).format("d"), // day of the week formatted as a string
          time: moment(time).format("hh:mm A"), // selected time formatted as a string
          checked: false, // checkbox status (not checked by default)
          color: randomcolor(), // randomly generated color
          projectName: todoProject, // selected project name
        });

      // reset state values and close the modal
      setShowModal(false);
      setText("");
      setDay(new Date());
      setTime(new Date());
    }
  }

  // set the selected project when it changes
  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="AddNewTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ New Todo</button>{" "}
        {/* button to display the modal */}
      </div>
      {/* modal component */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {/* form component */}
        <TodoForm
          handleSubmit={handleSubmit}
          heading={"Add New Todo!"}
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButton={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
}

export default AddNewTodo;

import React, { useState } from "react";
import Modal from "./modal";
import ProjectForm from "./projectForm";
import { Plus } from "react-bootstrap-icons";
import firebase from "../firebase";

function AddNewProject() {
  // state
  const [showModal, setShowModal] = useState(false); // controls visibility of modal
  const [projectName, setProjectName] = useState(""); // holds name of new project being added

  // function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      // if the name is not empty
      const projectRef = firebase.firestore().collection("projects");

      // check if a project with the same name already exists
      projectRef
        .where("name", "==", projectName)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // if no project with the same name exists
            projectRef.add({
              name: projectName,
            });
          } else {
            // if a project with the same name already exists
            alert("Project already exists");
          }
        });

      // close modal and reset project name input
      setShowModal(false);
      setProjectName("");
    }
  }

  return (
    <div className="AddNewProject">
      {/* button to open modal */}
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="20" />
        </span>
      </div>
      {/* modal that contains the project form */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="New project!" // text displayed at the top of the modal
          value={projectName} // value of the project name input
          setValue={setProjectName} // function to update the project name input value
          setShowModal={setShowModal} // function to close the modal
          confirmButtonText="+ Add Project" // text displayed on the submit button
        />
      </Modal>
    </div>
  );
}

export default AddNewProject;

import React, { useState } from "react";
import Modal from "./modal";
import ProjectForm from "./projectForm";
import { Plus } from "react-bootstrap-icons";
import firebase from "../firebase";

function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      const projectRef = firebase.firestore().collection("projects");

      projectRef
        .where("name", "==", projectName)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            projectRef.add({
              name: projectName,
            });
          } else {
            alert("Project already exists");
          }
        });
      setShowModal(false);
      setProjectName("");
    }
  }

  return (
    <div className="AddNewProject">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="20" />
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="New project!"
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText="+ Add Project"
        />
      </Modal>
    </div>
  );
}

export default AddNewProject;

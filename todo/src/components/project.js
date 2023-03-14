import React, { useState, useContext } from "react";
import { Pencil, XCircle } from "react-bootstrap-icons";
import RenameProject from "./renameProject";
import Modal from "./modal";
import { TodoContext } from "../context";
import firebase from "../firebase";

function Project({ project, edit }) {
  // Get the TodoContext from the parent component
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);

  // Define a state variable to control whether to show the rename project modal or not
  const [showModal, setShowModal] = useState(false);

  // Define a function to delete a project and all its associated todos
  const deleteProject = (project) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(project.id)
      .delete()
      .then(() => {
        // Delete all todos associated with the deleted project
        firebase
          .firestore()
          .collection("todos")
          .where("projectName", "==", project.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      })
      .then(() => {
        // If the deleted project was the selected project, reset the selected project to the default project
        if (selectedProject === project.name) {
          setSelectedProject(defaultProject);
        }
      });
  };

  return (
    <div className="Project">
      <div className="name" onClick={() => setSelectedProject(project.name)}>
        {project.name}
      </div>
      <div className="btns">
        {/* If the component is in edit mode, show edit and delete buttons */}
        {edit ? (
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <Pencil size={13} />
            </span>
            <span className="delete" onClick={() => deleteProject(project)}>
              <XCircle size={13} />
            </span>
          </div>
        ) : project.numOfTodos === 0 ? (
          ""
        ) : (
          <div className="total-todos">{project.numOfTodos}</div>
        )}
      </div>
      {/* Show the RenameProject modal if the showModal state variable is true */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}

export default Project;

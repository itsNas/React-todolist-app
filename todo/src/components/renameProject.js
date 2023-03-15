import React, { useState, useContext } from "react";
import ProjectForm from "./projectForm";
import firebase from "../firebase";
import { TodoContext } from "../context";

function RenameProject({ project, setShowModal }) {
  // Get the selectedProject and setSelectedProject from the TodoContext
  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  // Define a state variable to hold the new project name
  const [newProjectName, setNewProjectName] = useState(project.name);

  // Function to rename project
  const renameProject = (project, newProjectName) => {
    const projectsRef = firebase.firestore().collection("projects");
    const todosRef = firebase.firestore().collection("todos");

    // Get the old project name
    const { name: oldProjectName } = project;

    // Check if a project with the same name already exists
    projectsRef
      .where("name", "==", newProjectName)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          alert("Project with the same name already exists!");
        } else {
          // Update the project name
          projectsRef
            .doc(project.id)
            .update({
              name: newProjectName,
            })
            .then(() => {
              // Update the project name in all the todos associated with the project
              todosRef
                .where("projectName", "==", oldProjectName)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    doc.ref.update({
                      projectName: newProjectName,
                    });
                  });
                })
                .then(() => {
                  // Update the selected project in the TodoContext if it was the renamed project
                  if (selectedProject === oldProjectName) {
                    setSelectedProject(newProjectName);
                  }
                });
            });
        }
      });
  };

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    renameProject(project, newProjectName);
    setShowModal(false);
  }

  // Render the form to rename the project
  return (
    <div className="RenameProject">
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Edit project name!"
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText="Confirm"
      />
    </div>
  );
}

export default RenameProject;

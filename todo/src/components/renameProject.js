import React, { useState } from "react";
import ProjectForm from "./projectForm";

function RenameProject(project, setShowModal) {
  const [newProjectName, setNewProjectName] = useState(project.name);

  function handleSubmit(e) {}

  return (
    <div className="RenameProject">
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Rename project!"
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText="Confirm"
      />
    </div>
  );
}

export default RenameProject;

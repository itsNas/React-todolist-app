import React, { createContext, useState } from "react";
import {
  useTodos,
  useProjects,
  useFilterTodos,
  useProjectsWithStats,
} from "../hooks";

// Create a context object to share data between components
const TodoContext = createContext();

function TodoContextProvider({ children }) {
  // Set the default project to "today"
  const defaultProject = "today";

  // Define state variables
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);

  // Use custom hooks to retrieve and filter todos and projects
  const todos = useTodos();
  const projects = useProjects(todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);
  const projectsWithStats = useProjectsWithStats(projects, todos);

  // Provide the context to child components and pass data as values
  return (
    <TodoContext.Provider
      value={{
        defaultProject,
        selectedProject,
        setSelectedProject,
        todos: filteredTodos,
        projects: projectsWithStats,
        selectedTodo,
        setSelectedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Export the context and context provider as named exports
export { TodoContextProvider, TodoContext };

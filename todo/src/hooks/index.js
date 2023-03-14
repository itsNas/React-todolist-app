// Importing necessary modules
import moment from "moment";
import { useState, useEffect } from "react";
import firebase from "../firebase";

// Custom hook to fetch all the todos
export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch all the todos from firebase database and set the state
    let unsubscribe = firebase
      .firestore()
      .collection("todos")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTodos(data);
      });

    // Clean up function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  // Return the todos
  return todos;
}

// Custom hook to filter todos based on selected project
export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormatted = moment().format("DD/MM/YYYY");

    // Filter todos based on selected project
    if (selectedProject === "today") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "DD/MM/YYYY");
        const todayDate = moment(todayDateFormatted, "DD/MM/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");

        return diffDays >= 0 && diffDays < 1;
      });
    } else if (selectedProject === "next 7 days") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "DD/MM/YYYY");
        const todayDate = moment(todayDateFormatted, "DD/MM/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");

        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === "all days") {
      data = todos;
    } else if (selectedProject === "overdue") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "DD/MM/YYYY");
        const todayDate = moment(todayDateFormatted, "DD/MM/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");

        return diffDays < 0;
      });
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }

    // Set the filtered todos state
    setFilteredTodos(data);
  }, [todos, selectedProject]);

  // Return the filtered todos
  return filteredTodos;
}

// Custom hook to fetch all the projects
export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  // Function to calculate the number of todos in a project
  function calculateNumOfTodos(projectName, todos) {
    return todos.filter((todo) => todo.projectName === projectName).length;
  }

  useEffect(() => {
    // Fetch all the projects from firebase database and set the state
    let unsubscribe = firebase
      .firestore()
      .collection("projects")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const projectName = doc.data().name;

          return {
            id: doc.id,
            name: projectName,
            numOfTodos: calculateNumOfTodos(projectName, todos),
          };
        });
        setProjects(data);
      });

    // Clean up function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  // Return the projects
  return projects;
}

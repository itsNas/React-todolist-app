import "./App.css";
import { useState } from "react";
import Main from "./components/main";
import Sidebar from "./components/sidebar";
import User from "./components/user";
import AddNewTodo from "./components/addNewTodo";
import Calendar from "./components/calendar";
import Projects from "./components/projects";
import Todos from "./components/todos";
import EditTodo from "./components/editTodo";
import { List, X } from "react-bootstrap-icons";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="App">
      <div className={`sidebar ${sidebarVisible ? "" : "sidebar-hidden"}`}>
        <Sidebar>
          <div className="close-button" onClick={toggleSidebar}>
            <X />
          </div>
          <User />
          <AddNewTodo />
          <Calendar />
          <Projects />
        </Sidebar>
      </div>

      <Main>
        <div
          className={`menu ${sidebarVisible ? "menu-hidden" : ""}`}
          onClick={toggleSidebar}
        >
          <List />
        </div>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;

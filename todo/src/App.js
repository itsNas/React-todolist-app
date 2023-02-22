import "./App.css";

import Main from "./components/main";
import Sidebar from "./components/sidebar";
import User from "./components/user";
import AddNewTodo from "./components/addNewTodo";
import Calendar from "./components/calendar";
import Projects from "./components/projects";
import Todos from "./components/todos";
import EditTodo from "./components/editTodo";

function App() {
  return (
    <div className="app">
      <Sidebar>
        <User />
        <AddNewTodo />
        <Calendar />
        <Projects />
      </Sidebar>
      <Main>
        <Todos />
        <EditTodo />
      </Main>
    </div>
  );
}

export default App;

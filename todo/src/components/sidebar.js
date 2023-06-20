import React, { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../context";
import { X } from "react-bootstrap-icons";

function Sidebar({ children }) {
  // CONTEXT
  const { setSelectedTodo } = useContext(TodoContext);

  // REF
  const sidebarRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  });

  const handleClick = (e) => {
    if (
      e.target === sidebarRef.current ||
      sidebarRef.current.contains(e.target)
    ) {
      setSelectedTodo(undefined);
    }
  };

  return (
    <div className="sidebar" ref={sidebarRef}>
      {children}
    </div>
  );
}

export default Sidebar;

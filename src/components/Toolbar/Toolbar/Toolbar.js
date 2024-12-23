import React from "react";
import "./Toolbar.css";
import { FaBars } from "react-icons/fa"; // Import hamburger icon
const Toolbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-dark nav-bar-color d-flex justify-content-between align-items-center px-3">
      {/* Title on the left */}
         {/* Hamburger Icon on the Right */}
         <div className="toolbar-menu-section">
         <button className="btn btn-outline-light" onClick={toggleSidebar}>
        <FaBars size={20} />
        </button>
        <span className="navbar-brand mb-0 h1 tool-bar-left-section">Library</span>
         </div>
     

      <span className="navbar-brand mb-0 h1 logout-section">Logout</span>


    </nav>
  );
};

export default Toolbar;

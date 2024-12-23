import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaTachometerAlt, FaBook ,FaAddressBook} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar sidebar-color text-white ${isOpen ? "open" : "closed"}`}>
      <ul className="list-unstyled px-2 mt-4 pt-2">
        <li>
          <NavLink
            to="/"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active-link"
          >
            <FaTachometerAlt className="sidebar-icon" />
            {isOpen && <span className="ms-2">Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/books"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active-link"
          >
            <FaBook className="sidebar-icon" />
            {isOpen && <span className="ms-2">Books</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/categories"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active-link"
          >
            <FaAddressBook className="sidebar-icon" />
            {isOpen && <span className="ms-2">Category</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/books"
            className="nav-link text-white d-flex align-items-center"
            activeClassName="active-link"
          >
            <FaAddressBook className="sidebar-icon" />
            {isOpen && <span className="ms-2">Issued</span>}
          </NavLink>
        </li>

      </ul>
    </div>
  );
};


export default Sidebar;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./components/Books/Books";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbar from "./components/Toolbar/Toolbar/Toolbar";
import BooksDetail from "./components/Books/book-detail";
import "./App.css";
import Categories from "./components/Category/Categories";
import CategoryDetail from "./components/Category/Category-Detail";
import BookIssued from "./components/Issued_book/BookIssued";
import BookIssuedDetail from "./components/Issued_book/BookIssued_Detail";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Toolbar at the top */}
        <Toolbar toggleSidebar={toggleSidebar} />

        {/* Main container to hold Sidebar and Content */}
        <div className="d-flex">
          {/* Sidebar starts below Toolbar */}
          <Sidebar isOpen={isSidebarOpen} />

          {/* Main Content */}
          <div className="main-content flex-grow-1 p-3">
            <Routes>
              <Route path="/" element={<Dashboard />} />
                   {/* ************************************* */}
              <Route path="/books" element={<Books />} />
              <Route path="books/book-detail/new" element={<BooksDetail />} />
              <Route path="books/book-detail/:id" element={<BooksDetail />} />
              {/* ************************************* */}
            
              <Route path="/categories" element={<Categories />} />
              <Route path="category/category-detail/new" element={<CategoryDetail />} />
              <Route path="categories/category-detail/:id" element={<CategoryDetail />} />

              <Route path="/bookIssued" element={<BookIssued />} />
              <Route path="bookIssued/bookIssued-detail/new" element={<BookIssuedDetail />} />
              <Route path="bookIssued/bookIssued-detail/:id" element={<BookIssuedDetail />} />
            </Routes>
          </div>''
        </div>
      </div>
    </Router>
  );
};

export default App;

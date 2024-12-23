import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import BookService from "./bookService";
import { useNavigate } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]); // State for book list
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [showModal, setShowModal] = useState(false); // Confirmation dialog
  const [deleteId, setDeleteId] = useState(null); // ID of the book to delete
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 10; // Items per page
  const [toastMessage, setToastMessage] = useState(""); // Toast message state

  // Fetch books on component load and search query change
  useEffect(() => {
    fetchBooks();


  }, [searchQuery]);

  // Fetch books from the server
  const fetchBooks = async () => {
    try {
      const response = await BookService.getBooks();
      let filteredBooks = response.data;

      if (searchQuery) {
        // Filter by search query (case insensitive)
        filteredBooks = response.data.filter((book) =>
          book.book.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Handle Delete Icon Click - Show Confirmation Dialog
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    try {
      await BookService.deleteBook(deleteId);
      setShowModal(false);
      fetchBooks();
      setToastMessage("Book deleted successfully!");
      setTimeout(() => setToastMessage(""), 3000); // Hide toast after 3 seconds
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Handle Page Change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the books to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();
  // Generate pagination numbers
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container-fluid book-main-section">
      <div className="book-secondary-section">
        {/* Header with Search Bar */}
        <div className="card-header table-header-color border p-2 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Books</h4>
          <div>
            <input
              type="text"
              className="form-control d-inline-block me-2"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "330px" }}
            />
            <button
              type="button"
              style={{ width: "5.5rem" }}
              className="btn btn-secondary"
              onClick={() => navigate("./book-detail/new")} // Route to New Book page
            >
              New
            </button>
          </div>
        </div>

        {/* Books Table */}
        <div className="card-body p-0">
          <table className="table table-striped table-hover table-bordered mb-0">
            <thead style={{ backgroundColor: "grey", textAlign: "center" }}>
              <tr>
                <th scope="col" style={{ width: "5%" }}>ID</th>
                <th scope="col" style={{ width: "35%" }}>Book</th>
                <th scope="col" style={{ width: "25%" }}>Author</th>
                <th scope="col" style={{ width: "20%" }}>Category</th>
                <th scope="col" style={{ width: "20%" }}>Available</th>
                <th scope="col" style={{ width: "10%" }} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.book}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td className="text-center">
                      <span
                        className={`badge ${book.available === "stock" ? "bg-success" : "bg-secondary"
                          }`}
                      >
                        {book.available === "stock" ? "Available" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="text-center">
                      {/* Edit Button */}
                      <Link to={`./book-detail/${book.id}`}>
                        <span className="me-3 text-primary" style={{ cursor: "pointer" }}>
                          <FaEdit />
                        </span>
                      </Link>
                      {/* Delete Button */}
                      <span
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClick(book.id)}
                      >
                        <FaTrash />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Books Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="card-footer d-flex justify-content-start">
          <nav>
            <ul className="pagination mb-0">
              {paginationNumbers.map((page) => (
                <li
                  key={page}
                  className={`page-item ${page === currentPage ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showModal && (
        <div className="modal show d-block" tabIndex="1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this book item?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="position-fixed top-0 end-0 pt-5" style={{ zIndex: 5 }}>
          <div className="toast show bg-success text-white">
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;

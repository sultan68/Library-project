import React, { useEffect, useState } from "react";
import BookIssuedService from "./bookIssuedService";
import BookService from "../Books/bookService";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookIssued = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
      const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);
        const [toastMessage, setToastMessage] = useState("");
  // Fetch issued books and books on component mount
  useEffect(() => {
  
    fetchIssuedBooks();
  }, []);
  const fetchIssuedBooks = async () => {
    try {
      const [issuedBooksResponse, booksResponse] = await Promise.all([
        BookIssuedService.getIssuedBooks(),
        BookService.getBooks(),
      ]);
      setIssuedBooks(issuedBooksResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Get book name by ID
  const getBookName = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.book : "Unknown";
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
};

const confirmDelete = async () => {
  try {
      await BookIssuedService.deleteIssuedBook(deleteId);
      setShowModal(false);
      fetchIssuedBooks();
      setToastMessage("Issued book deleted successfully!");
      setTimeout(() => setToastMessage(""), 3000);
  } catch (error) {
      console.error("Error deleting Issued-boob:", error);
  }
};
  return (
    <div className="container-fluid book-main-section">
      <div className="book-secondary-section">
        {/* Header with Search Bar */}
        <div className="card-header table-header-color border p-2 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Issued Books</h4>
          <div>
            <input
              type="text"
              className="form-control d-inline-block me-2"
              placeholder="Search by Person Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "330px" }}
            />
            <button
              type="button"
              style={{ width: "5.5rem" }}
              className="btn btn-secondary"
              onClick={() => navigate("./bookIssued-detail/new")}
            >
              New
            </button>
          </div>
        </div>

        {/* Issued Books Table */}
        <div className="card-body p-0">
          <table className="table table-striped table-hover table-bordered mb-0">
            <thead style={{ backgroundColor: "grey", textAlign: "center" }}>
              <tr>
                <th scope="col" style={{ width: "5%" }}>ID</th>
                <th scope="col" style={{ width: "20%" }}>Person Name</th>
                <th scope="col" style={{ width: "25%" }}>Book</th>
                <th scope="col" style={{ width: "20%" }}>Mobile Number</th>
                <th scope="col" style={{ width: "30%" }}>Address</th>
                <th scope="col" style={{ width: "10%" }} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.length > 0 ? (
                issuedBooks
                  .filter((book) =>
                    book.personName.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((issuedBook) => (
                    <tr key={issuedBook.id}>
                      <td>{issuedBook.id}</td>
                      <td>{issuedBook.personName}</td>
                      <td>{getBookName(issuedBook.bookId)}</td>
                      <td>{issuedBook.mobileNumber}</td>
                      <td>{issuedBook.address}</td>
                      <td className="text-center">
                        {/* Edit Button */}
                        <Link to={`./bookIssued-detail/${issuedBook.id}`}>
                          <span className="me-3 text-primary" style={{ cursor: "pointer" }}>
                            <FaEdit />
                          </span>
                        </Link>
                        {/* Delete Button */}
                        <span
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteClick(issuedBook.id)}
                          >
                          <FaTrash />
                        </span>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Issued Books Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this Issued-book?
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={confirmDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
                {toastMessage && (
                <div
                    className="position-fixed top-0 end-0"
                    style={{ zIndex: 5, paddingTop: "4.5rem" }}
                >
                    <div className="toast show bg-success text-white">
                        <div className="toast-body">{toastMessage}</div>
                    </div>
                </div>
            )}
    </div>
  );
};

export default BookIssued;

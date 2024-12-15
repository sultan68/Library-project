import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import edit and delete icons
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Books.css";
import { Link } from "react-router-dom"; // Import Link for routing


const Books = () => {
  // Sample list of books
  const books = [
    { id: 1, book: "The Alchemist", author: "Paulo Coelho", category: "Fiction" },
    { id: 2, book: "1984", author: "George Orwell", category: "Dystopian" },
    { id: 3, book: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic" },
    { id: 4, book: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic" },
    { id: 5, book: "Sapiens", author: "Yuval Noah Harari", category: "History" },
  ];

  return (
    <div className=".container-fluid book-main-section">
      <div className=" book-secondary-section">
        <div className="card-header table-header-color border p-2">
          <h4 className="mb-0"> Books </h4>
        </div>
        <div className="card-body p-0 " >
        <table className="table table-striped table-hover table-bordered mb-0">
        <thead style={{ backgroundColor: 'grey' }}>
      <tr>
        <th scope="col" style={{ width: "5%" }}>ID</th>
        <th scope="col" style={{ width: "35%" }}>Book</th>
        <th scope="col" style={{ width: "25%" }}>Author</th>
        <th scope="col" style={{ width: "20%" }}>Category</th>
        <th scope="col" style={{ width: "10%" }} className="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book) => (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.book}</td>
          <td>{book.author}</td>
          <td>{book.category}</td>
          <td className="text-center">
                {/* Edit Button with Link to BookDetail and passing the ID */}
                <Link to={`/book-detail/${book.id}`}>
                  <span className="me-3 text-primary" style={{ cursor: "pointer" }}>
                    <FaEdit />
                  </span>
                </Link>
                {/* Delete Button */}
                <span className="text-danger" style={{ cursor: "pointer" }}>
                  <FaTrash />
                </span>
              </td>
        </tr>
      ))}
    </tbody>
  </table>
        </div>
      </div>
    </div>
  );
};

export default Books;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import BookService from "./bookService";

const BooksDetail = () => {
  const { id } = useParams(); // Get the book ID from the route
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(""); // Toast message state
  // State to hold book details
  const [bookDetails, setBookDetails] = useState({
    book: "",
    author: "",
    category: "",
    available: "stock",
  });

  // State for image preview
  const [image, setImage] = useState(null);

  // Fetch book details in edit mode
  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          const response = await BookService.getBookById(id);
          const data = response.data[0];
          setBookDetails({
            book: data.book || "",
            author: data.author || "",
            category: data.category || "",
            available: data.available || "stock",
          });
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      };
      fetchBookDetails();
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBookDetails((prev) => ({ ...prev, [id]: value }));
  };

  
  // Save button logic for both New and Edit
  const handleSave = async () => {
    try {
      if (id) {
        // Edit Flow
        await BookService.updateBook(id, bookDetails);
        toast.success("Book updated successfully!");

      } else {
        // New Flow
        await BookService.createBook(bookDetails);
        toast.success("New book added successfully!");
        navigate("./books"); // Navigate back to book list
      }
      setToastMessage("Book Saved successfully!");
        setTimeout(() => setToastMessage(""), 9000); 
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book.");
    }
  };

  // Navigate back to books list
  const handleBackClick = () => {
    navigate("/./books");
  };

  return (
    <div className="container-fluid">
      {/* Toolbar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-secondary" onClick={handleBackClick}>
          <FaArrowLeft /> Back
        </button>
        <h2>{id ? "Edit Book" : "New Book"}</h2>
      </div>

      {/* Card layout */}
      <div className="row">
        {/* Left Section: Book Details Form */}
        <div className="col-md-12">
          <div className="card p-3">
            <div className="row">
              {/* Book Title */}
              <div className="col-md-6 mb-3">
                <label htmlFor="book">Book Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="book"
                  value={bookDetails.book}
                  onChange={handleInputChange}
                />
              </div>

              {/* Author */}
              <div className="col-md-6 mb-3">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={bookDetails.author}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}
              <div className="col-md-6 mb-3">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={bookDetails.category}
                  onChange={handleInputChange}
                />
              </div>

              {/* Availability */}
              <div className="col-md-6 mb-3">
                <label htmlFor="available">Availability</label>
                <select
                  className="form-control"
                  id="available"
                  value={bookDetails.available}
                  onChange={handleInputChange}
                >
                  <option value="stock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                </select>
              </div>

              {/* Save Button */}
              <div className="col-md-12">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Image Upload */}
       
      </div>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="position-fixed top-0 end-0" style={{ zIndex: 5 ,paddingTop:"4.5rem"}}>
          <div className="toast show bg-success text-white">
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
    
  );
  
};

export default BooksDetail;

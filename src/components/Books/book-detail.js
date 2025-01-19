import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import BookService from "./bookService";

const BooksDetail = () => {
  const { id } = useParams(); // Get the book ID from the route
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(""); // Toast message state
  const [categories, setCategories] = useState([]); // Initialize categories state

  // State to hold book details
  const [bookDetails, setBookDetails] = useState({
    book: "",
    author: "",
    category: { id: "", name: "" },
    available: "stock",
  });

  // Fetch book details in edit mode
  
  useEffect(() => {
    console.log("Editing Book ID:", id);

    const fetchBookDetailsAndCategories = async () => {
      try {
        if (id) {
          const bookResponse = await BookService.getBookById(id);
          const bookData = bookResponse.data[0];
          console.log("Fetched Book Data:", bookResponse.data);
          console.log("Fetched Book Data222:", bookData[0]);
          setBookDetails({
            book: bookData.book || "",
            author: bookData.author || "",
            category: bookData.category || { id: "", name: "" },
            available: bookData.available || "stock",
          });
          console.log("bookData.book :",bookData.book );
          console.log("bookData.author :",bookData.author );
          console.log("bookData.category :",bookData.category );
          console.log("bookDetails:",bookDetails);
        }

        const categoryResponse = await BookService.getCategories();
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookDetailsAndCategories();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle category separately as an object
    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.id === value);
      setBookDetails((prev) => ({
        ...prev,
        category: selectedCategory || { id: "", name: "" },
      }));
    } else {
      setBookDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Save button logic for both New and Edit
  const handleSave = async () => {
    try {
      if (!bookDetails.book || !bookDetails.author || !bookDetails.category.id) {
        toast.error("All fields are required.");
        return;
      }
   console.log("id:",id)
      if (id) {
        // Edit Flow
        await BookService.updateBook(id, bookDetails);
        setToastMessage("Book updated successfully!");
      } else {
        // New Flow
        await BookService.createBook(bookDetails);
        setToastMessage("Book updated successfully!");
        navigate("/books"); // Navigate back to book list
      }
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book.");
    }
  };

  // Navigate back to books list
  const handleBackClick = () => {
    navigate("/books");
  };

  return (
    <div className="container-fluid">
      {/* Toolbar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-secondary" onClick={handleBackClick}>
          Back
        </button>
        <h2>{id ? "Edit Book" : "New Book"}</h2>
      </div>

      {/* Book Details Form */}
      <div className="card p-3">
        <div className="row">
          {/* Book Title */}
          <div className="col-md-6 mb-3">
            <label htmlFor="book">Book Title</label>
            <input
              type="text"
              className="form-control"
              name="book"
              value={bookDetails.book}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Author */}
          <div className="col-md-6 mb-3">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={bookDetails.author}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Category */}
          <div className="col-md-6 mb-3">
            <label htmlFor="category">Category</label>
            <select
              className="form-select"
              name="category"
              value={bookDetails.category.id || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="col-md-6 mb-3">
            <label htmlFor="available">Availability</label>
            <select
              className="form-control"
              name="available"
              value={bookDetails.available}
              onChange={handleInputChange}
              required
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

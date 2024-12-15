import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate for programmatic navigation
import { FaArrowLeft } from "react-icons/fa"; // For back button icon

const BooksDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // To handle navigation

  // State for image preview
  const [image, setImage] = useState(null);

  // Handle file change (preview image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Use useEffect to log the ID when the component is loaded
  useEffect(() => {
    console.log("Book ID from URL:", id); // Log the ID in the console
  }, [id]);

  // Navigate back to the books list page
  const handleBackClick = () => {
    navigate("/"); // Navigate to the Books list page (or wherever the list page is)
  };

  return (
    <div className="container-fluid">
      {/* Toolbar */}
      <div className="d-flex justify-content-between align-items-center ">
        <button className="btn btn-secondary" onClick={handleBackClick}>
          <FaArrowLeft /> Back
        </button>
        <h2>Book Details</h2>
      </div>

      {/* Card layout */}
      <div className="row">
        {/* Left Section: Book Details Form */}
        <div className="col-md-8">
          <div className="card p-3" style={{ height: "100%" }}>
            <div className="row">
              {/* Book Title and Author */}
              <div className="col-md-6 mb-3">
                <label htmlFor="bookTitle">Book Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="bookTitle"
                  placeholder="Enter book title"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Enter author name"
                />
              </div>

              {/* Category and Available/Out of Stock */}
              <div className="col-md-6 mb-3">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  placeholder="Enter category"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="stockStatus">Availability</label>
                <select className="form-control" id="stockStatus">
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>
              <div className="col-md-12 mb-3">
                    <button
                className="btn btn-primary"
                onClick={() => {}}
              >
                Save
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Image Preview and Upload */}
        <div className="col-md-4">
          <div className="card p-3" style={{ height: "100%" }}>
            <h5>Image Preview</h5>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
              {/* Image Preview */}
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain", // Prevent image from breaking
                  }}
                />
              ) : (
                <div className="text-center text-muted">No image selected</div>
              )}
            </div>
            <div className="mt-3 d-flex justify-content-between">
              {/* Browse Button */}
              <input
                type="file"
                id="imageUpload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Browse
              </button>

              {/* Upload Button */}
              <button className="btn btn-success">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksDetail;

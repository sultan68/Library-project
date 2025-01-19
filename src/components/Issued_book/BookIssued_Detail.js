import React, { useEffect, useState } from "react";
import BookIssuedService from "./bookIssuedService";
import BookService from "../Books/bookService"; // Import your BookService
import CategoryService from "../Category/cateogryService"; // Import your CategoryService
import { useNavigate, useParams } from "react-router-dom";

const BookIssuedDetail = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const [issuedBook, setIssuedBook] = useState({
        personName: "",
        bookId: "",
        categoryId: "",
        mobileNumber: "",
        address: "",
    });
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch books and categories
                const booksResponse = await BookService.getBooks();
                const categoriesResponse = await CategoryService.getCategories();

                setBooks(booksResponse.data);
                setCategories(categoriesResponse.data);

                // If `id` exists, fetch issued book details
                if (id) {
                    const issuedBookResponse = await BookIssuedService.getIssuedBookById(id);
                    const issuedBookData = issuedBookResponse.data;

                    // Find the selected book and its category
                    const selectedBook = booksResponse.data.find(
                        (book) => book.id.toString() === issuedBookData.bookId.toString()
                    );

                    setIssuedBook({
                        ...issuedBookData,
                        bookId: selectedBook ? selectedBook.id : "",
                        categoryId: selectedBook && selectedBook.category ? selectedBook.category.id : "",
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "bookId") {
            // Find the selected book by its ID
            const selectedBook = books.find((book) => book.id.toString() === value);

            if (selectedBook) {
                setIssuedBook((prev) => ({
                    ...prev,
                    bookId: selectedBook.id,
                    categoryId: selectedBook.category ? selectedBook.category.id : "",
                }));
            }
        } else {
            setIssuedBook((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // Update existing book issuance
                await BookIssuedService.updateIssuedBook(id, issuedBook);
                setToastMessage("Book issuance updated successfully!");
            } else {
                // Create new book issuance
                await BookIssuedService.createIssuedBook(issuedBook);
                setToastMessage("Book issued successfully!");
            }

            setTimeout(() => setToastMessage(""), 3000);

            // Redirect to the list page
            navigate("/bookIssued");
       

        } catch (error) {
            console.error("Error saving issued book:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Edit Issued Book" : "Issue a Book"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Person Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="personName"
                        value={issuedBook.personName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Book</label>
                    <select
                        className="form-select"
                        name="bookId"
                        value={issuedBook.bookId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Book</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.book}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Category</label>
                    <select
                        className="form-select"
                        name="categoryId"
                        value={issuedBook.categoryId}
                        disabled
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        value={issuedBook.mobileNumber}
                        onChange={handleInputChange}
                        pattern="\d{10}"
                        title="Mobile number must be 10 digits."
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <textarea
                        className="form-control"
                        name="address"
                        value={issuedBook.address}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? "Update" : "Issue"} Book
                </button>
            </form>

            {/* Toast Notification */}
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

export default BookIssuedDetail;

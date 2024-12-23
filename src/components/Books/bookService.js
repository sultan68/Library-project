import axios from "axios";

const BASE_URL = "http://localhost:3001/books"; // JSON Server URL

const BookService = {
  getBooks: () => axios.get(BASE_URL),
  deleteBook: (id) => axios.delete(`${BASE_URL}/${id}`),
  searchBooks: (query) => axios.get(`${BASE_URL}?book_like=${query}`), // Search by book name
  getBookById: (id) => axios.get(`${BASE_URL}?id=${id}`), // Fetch book by ID
  createBook: async (bookData) => {
    // Fetch the existing books to get the last ID
    const response = await axios.get(BASE_URL);
    const books = response.data;
    const lastId = books.length ? Math.max(...books.map(book => parseInt(book.id))) : 0;
    const newId = lastId + 1; // Generate the next available ID
    const newBook = { ...bookData, id: newId }; // Add the new ID to the book data
    
    // Send the new book to the backend
    return axios.post(BASE_URL, newBook);
  }, // Add a new book
  updateBook: (id, bookData) => axios.put(`${BASE_URL}/${id}`, bookData), // Update a book
};
  
export default BookService;


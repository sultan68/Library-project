import axios from "axios";



const BASE_URL_ISSUED = "http://localhost:3001/bookIssued";

const BookIssuedService = {
  getIssuedBooks: () => axios.get(BASE_URL_ISSUED), // Get all issued books
  getIssuedBookById: (id) => axios.get(`${BASE_URL_ISSUED}/${id}`), // Get a single issued book by ID
  createIssuedBook: async (bookIssuedData) => {
    const response = await axios.get(BASE_URL_ISSUED);
    const issuedBooks = response.data;
    const lastId = issuedBooks.length
      ? Math.max(...issuedBooks.map((issuedBook) => parseInt(issuedBook.id)))
      : 0;
    const newId = lastId + 1; // Generate the next available ID
    const newIssuedBook = { ...bookIssuedData, id: newId };
    return axios.post(BASE_URL_ISSUED, newIssuedBook);
  },
  updateIssuedBook: (id, bookIssuedData) => axios.put(`${BASE_URL_ISSUED}/${id}`, bookIssuedData),
  deleteIssuedBook: (id) => axios.delete(`${BASE_URL_ISSUED}/${id}`),
};

export default BookIssuedService;


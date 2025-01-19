import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import "bootstrap/dist/css/bootstrap.min.css";
import BookService from "../Books/bookService";
import BookIssuedService from "../Issued_book/bookIssuedService";


const Dashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksIssued, setBooksIssued] = useState(0);
  const [availableBooks, setAvailableBooks] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch books
      const booksResponse = await BookService.getBooks();
      const books = booksResponse.data;
      // Fetch issued books
      const issuedBooksResponse = await BookIssuedService.getIssuedBooks();
      const issuedBooks = issuedBooksResponse.data;

      // Calculate counts
      const total = books.length;
      const issued = issuedBooks.length;
      const available = total - issued;

      // Update state
      setTotalBooks(total);
      setBooksIssued(issued);
      setAvailableBooks(available);
    } catch (error) {
      console.error("Error fetching data for dashboard:", error);
    }
  };

  return (
    <div className="container-fluid mt-2">
      <h2 className="mb-5 text-maroon">Dashboard</h2>
      <div className="row justify-content-center">
        {/* Total Books */}
        <Card title="Total Books Available" count={totalBooks} bgColor="#800000" />
        {/* Books Issued */}
        <Card title="Books Issued" count={booksIssued} bgColor="#990000" />
        {/* Available Books */}
        <Card title="Available Books" count={availableBooks} bgColor="#B22222" />
      </div>
    </div>
  );
};

const Card = ({ title, count, bgColor }) => {
  return (
    <div className="col-md-3 mb-4">
      <div
        className="card text-center shadow"
        style={{
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          border: "none",
          backgroundColor: bgColor,
          color: "white",
          height: "200px",
        }}
      >
        <div className="card-body d-flex flex-column justify-content-center">
          <h1>
            <CountUp start={0} end={count} duration={2.5} />
          </h1>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

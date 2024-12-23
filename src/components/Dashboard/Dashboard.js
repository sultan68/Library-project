import React from "react";
import CountUp from "react-countup";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  // Static counter data (replace with dynamic data in the future)
  const totalBooks = 100;
  const booksIssued = 30;
  const availableBooks = totalBooks - booksIssued;

  return (
    <div className="container-fluid mt-2">
      <h2 className="mb-5 text-maroon"> Dashboard</h2>
      <div className="row justify-content-center">
        {/* Total Books */}
        <div className="col-md-3 mb-4">
          <div
            className="card text-center shadow"
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)", // Custom shadow control
              border: "none",
              backgroundColor: "#800000", // Maroon
              color: "white",
              height: "200px", // Customizable height
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <h1>
                <CountUp start={0} end={totalBooks} duration={2.5} />
              </h1>
              <p>Total Books Available</p>
            </div>
          </div>
        </div>

        {/* Books Issued */}
        <div className="col-md-3 mb-4">
          <div
            className="card text-center shadow"
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              border: "none",
              backgroundColor: "#990000", // Slightly lighter maroon
              color: "white",
              height: "200px", // Customizable height
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <h1>
                <CountUp start={0} end={booksIssued} duration={2.5} />
              </h1>
              <p>Books Issued</p>
            </div>
          </div>
        </div>

        {/* Available Books */}
        <div className="col-md-3 mb-4">
          <div
            className="card text-center shadow"
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.0)",
              border: "none",
              backgroundColor: "#B22222", // Brighter maroon shade
              color: "white",
              height: "200px", // Customizable height
            }}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <h1>
                <CountUp start={0} end={availableBooks} duration={2.5} />
              </h1>
              <p>Available Books</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

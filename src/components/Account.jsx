import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useGetUserReservationsQuery,
  useReturnBookMutation,
} from "./AccountSlice";

const Account = () => {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: userError,
  } = useGetUserDetailsQuery();
  const {
    data: reservationsData,
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
    error: reservationsError,
  } = useGetUserReservationsQuery();
  const [returnBook, { isLoading: isReturning }] = useReturnBookMutation();
  const [returningBookId, setReturningBookId] = useState(null);

  const isLoading = isLoadingUser || isLoadingReservations;
  const handleReturn = async (book) => {
    const reservationId = book.id;
    setReturningBookId(reservationId);
    try {
      await returnBook(reservationId).unwrap();
      alert(`Successfully returned "${book.title}"!`);
    } catch (error) {
      console.error("Failed to return book:", error);
      alert(
        `Failed to return book: ${
          error.data?.message || error.error || "Please try again."
        }`
      );
    } finally {
      setReturningBookId(null);
    }
  };
  if (isLoading) {
    return (
      <div className="container mt-4 text-center">
        Loading account details...
      </div>
    );
  }

  if (isErrorUser || !user) {
    let errorMessage = "Please log in to view your account.";
    if (isErrorUser && userError) {
      errorMessage = `Error loading account details: ${
        userError.status || ""
      } ${userError.data?.message || userError.error || "Please try again."}`;
      console.error("Error fetching user:", userError);
    } else if (!user && !isLoadingUser) {
      errorMessage = "Authentication failed. Please log in.";
    }
    return (
      <div className="container mt-4 text-center">
        <p>{errorMessage}</p>
        <Link to="/login" className="btn btn-primary me-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    );
  }

  const checkedOutBooks = reservationsData || [];

  return (
    <div className="accountDetails container mt-4">
      <div className="card mb-4">
        <div className="card-header">
          <h2>Account Details</h2>
        </div>
        <div className="card-body">
          <p>
            <strong>First Name:</strong> {user.firstname}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Checked-out Books</h2>
        </div>
        <div className="card-body">
          {isLoadingReservations && <p>Loading checked-out books...</p>}
          {isErrorReservations && (
            <p className="text-danger">
              Could not load checked-out books.{" "}
              {reservationsError?.data?.message || ""}
            </p>
          )}

          {!isLoadingReservations &&
            !isErrorReservations &&
            (checkedOutBooks.length === 0 ? (
              <p>You have no checked-out books.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {checkedOutBooks.map((book) => {
                  const isCurrentlyReturning = returningBookId === book.id;
                  return (
                    <li
                      key={book.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {book.title}
                      {}
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleReturn(book)}
                        disabled={isCurrentlyReturning || isReturning}
                      >
                        {isCurrentlyReturning ? "Returning..." : "Return"}
                      </button>
                      {}
                    </li>
                  );
                })}
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Account;

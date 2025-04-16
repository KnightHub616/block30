import { useGetBookQuery, useAddBookMutation } from "./BookSlice";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

export default function SingleBook() {
  const { id } = useParams();
  const {
    isLoading,
    data: book,
    isError: isBookError,
    error: bookError,
  } = useGetBookQuery(id);

  const [checkOutBook, { isLoading: isCheckingOut, error: checkoutError }] =
    useAddBookMutation();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  async function handleCheckout() {
    if (!isLoggedIn) {
      navigate("/login?returnTo=/books/" + id);
      return;
    }

    try {
      const response = await checkOutBook(id).unwrap();

      console.log("Checkout successful:", response);
      alert("Book checked out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to checkout book: ", error);
      alert(
        `Failed to checkout book: ${
          error.data?.message || error.error || "Please try again."
        }`
      );
    }
  }

  if (isLoading) {
    return <p>Loading book information...</p>;
  }

  if (isBookError || !book) {
    return (
      <p>
        Error loading book details:{" "}
        {bookError?.data?.message || bookError?.error || "Book not found."}
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <aside>
        <h2>Book Details</h2>
        <div className="book card p-3">
          <h3>{book.title}</h3>

          <h5>Author: {book.author}</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <figure>
                <img
                  src={book.coverimage}
                  alt={`Cover of ${book.title}`}
                  className="img-fluid rounded"
                />
              </figure>
            </div>
            <div className="col-md-8">
              <h5>Description: </h5>
              <p>{book.description}</p>
              {isLoggedIn ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !book.available}
                >
                  {isCheckingOut
                    ? "Checking out..."
                    : book.available
                    ? "Checkout"
                    : "Unavailable"}
                </button>
              ) : (
                <Link
                  to={`/login?returnTo=/books/${id}`}
                  className="btn btn-secondary"
                >
                  Login to Checkout
                </Link>
              )}
              {checkoutError && (
                <div className="alert alert-danger mt-2">
                  Checkout failed:{" "}
                  {checkoutError.data?.message ||
                    checkoutError.error ||
                    "An error occurred."}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

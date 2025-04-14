/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useGetBookQuery, useAddBookMutation } from "./BookSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";


export default function SingleBook() {
  const { id } = useParams();
  const { isLoading, data: book } = useGetBookQuery(id);
  const [checkOutBook] = useAddBookMutation(id);
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState(null);
 

 async function handleCheckout() {
    // This function will be called when the user clicks the "Checkout" button
    const token = localStorage.getItem("token");
    if (!token) {
     navigate("/login");
    }else { 
      try {
        const response = await checkOutBook(id).unwrap();
        if (response) {
          alert("Book checked out successfully!");
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to checkout book: ", error);
        alert("Failed to checkout book. Please try again.");
      }

     
  }
}
//   useEffect(() => {
//     if (id) {
//       setSelectedBookId(id);
//     }
//   }, [id]);

  let $details;
  if (!id) {
    $details = <p>Please select a book to see more details.</p>;
  } else if (isLoading) {
    $details = <p>Loading book information...</p>;
  } else {
    $details = (
      <div className="book">
        <h3>Title: "{book.title}"</h3>
        <h4>Id: #{book.id}</h4>
        <h5>Author: {book.author}</h5>
        <figure>
          <img src={book.coverimage} alt={book.description} />
        </figure>
        <h5>Description: </h5>
        <h6>{book.description}</h6>
        <div className="checkout book">
          <button
            className="checkout-button"
            type="submit"
            onClick={handleCheckout}
            
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <aside>
        <h2>Selected Book</h2>
        {$details}
      </aside>
    </>
  );
}

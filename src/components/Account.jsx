/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
// import React, { useEffect, useState } from "react";
import { useDeleteBooksMutation, useGetBookQuery } from "./BookSlice";
//
import { useAboutMeQuery } from "./AccountSlice";

export default function Account() {
  // 
    const [removeBook] = useDeleteBooksMutation();
  const { isLoading, data: user } = useAboutMeQuery();
  if (isLoading) {
    return <p>Loading account information...</p>;
  }
console.log(user);
  async function handleDeleteBook(bookId) {
    try {
      const response = await removeBook(bookId).unwrap();
      const result = await response.json();
      if (result) {
        alert("Book returned successfully!");
      }
    } catch (error) {
      console.error("Failed to return book: ", error);
    }
  }
  //

  return (
    <div className="accountDetails">
      <div>
        <h2>Account Details:</h2>
      </div>
      <div>
        <p>First Name: {user.firstname}</p>
        <p>Last Name: {user.lastname}</p>
        <p>Email: {user.email}</p>
        <p>Id: {user.id}</p>
      </div>
      <div>
        <h2>Checked-out Books</h2>
        {user.reservations.length === 0 ? (
          <p>You have no checked-out books</p>
        ) : (
          <ul>
            {user.reservations.map((book) => (
              <div key={book.id}>
                <li key={book.id}> {book.title}  </li>
                <img src= {book.coverimage} alt={book.title} />
                <button
                  className="return-button"
                  type="submit"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Return
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// useEffect(() => {

//     fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Unauthorized or error fetching user details");
//         }
//         return response.json();
//       })
//       .then((data) => setUser(data))
//       .catch((error) => console.error("Error:", error));

//     fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Unauthorized or error fetching reservation details");
//         }
//         return response.json();
//       })
//       .then((data) => setBooks(data))
//       .catch((error) => console.error("Error:", error));

// }, [])
// if(!user){
//     return (
//         <>
//             <div>Please log in to view your account</div>
//         </>
//     )
// }

import React, { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the user data from the API
    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/me")
      .then((response) => response.json())
      .then((data) => setUser(data));

    // Fetch the user's checked-out books from the API
    fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/me/books")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  if (!user) {
    return <div>Please log in to view your account</div>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <h3>Checked-out Books</h3>
      {books.length === 0 ? (
        <p>You have no checked-out books.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Account;
// completed by Josue

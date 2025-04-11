/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useAddBookMutation, useGetBookQuery } from "./BookSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import React from 'react'

export default function Books() {
    const [addBook] = useAddBookMutation();
    const navigate = useNavigate();
    const {status, isLoading, data: books} =useGetBookQuery();

    const viewBook= (id) => {
        navigate('/books/${id}');
      };
      console.log(addBook);

  return (
    
    <article>
      <h2>Books</h2>
      <ul className="books">
        {isLoading && <li>Loading books...</li>}
        {books?.data?.books.map((p) => (
          <li key={p.id}>
            <h3>
              {p.title} #{p.id}
            </h3>
            <figure>
              <img src={p.coverImage} alt={p.title} />
            </figure>
            <button onClick={() => navigate( viewBook)}>
              See details
            </button>
            {/* <button onClick={() => setSelectedPuppyId(p.id)}>
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </article>
  )
}

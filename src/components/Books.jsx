import { useGetBooksQuery } from "./BookSlice";
import { useGetUserReservationsQuery } from "./AccountSlice";
import { Link } from "react-router-dom";
import React from "react";

export default function Books({ searchTerm, isLoggedIn }) {
  const {
    data: bookList,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
  } = useGetBooksQuery();

  const {
    data: reservationsData,
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
  } = useGetUserReservationsQuery(undefined, {
    skip: !isLoggedIn,
  });

  const reservedBookIds = React.useMemo(() => {
    return new Set((reservationsData || []).map((book) => book.id));
  }, [reservationsData]);

  const searchedBooks = (bookList || []).filter((book) =>
    searchTerm
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const isLoading = isLoadingBooks || (isLoggedIn && isLoadingReservations);

  return (
    <>
      <article className="container mt-4">
        <h2>Library Catalog</h2>

        {isLoading && <p>Loading books...</p>}
        {isErrorBooks && (
          <p className="text-danger">Could not load book catalog.</p>
        )}
        {isErrorReservations && isLoggedIn && (
          <p className="text-warning">Could not load your reservations.</p>
        )}

        {!isLoading && searchedBooks.length === 0 && searchTerm && (
          <p>No books found matching "{searchTerm}".</p>
        )}
        {!isLoading && bookList && bookList.length === 0 && (
          <p>The library catalog is currently empty.</p>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4 myBooks">
          {!isLoading &&
            bookList &&
            searchedBooks.map((book) => {
              const isReserved = isLoggedIn && reservedBookIds.has(book.id);

              return (
                <div key={book.id} className="col">
                  <div
                    className={`card h-100 shadow-sm ${
                      isReserved ? "border-secondary" : ""
                    }`}
                  >
                    <div style={{ position: "relative" }}>
                      <Link
                        to={`/books/${book.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <img
                          src={book.coverimage}
                          className={`card-img-top ${
                            isReserved ? "opacity-50" : ""
                          }`}
                          alt={`Cover of ${book.title}`}
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                      </Link>
                      {isReserved && (
                        <span
                          className="badge bg-secondary position-absolute top-0 end-0 m-2"
                          style={{ zIndex: 1 }}
                        >
                          Checked Out
                        </span>
                      )}
                    </div>
                    <div className="card-body d-flex flex-column">
                      <Link
                        to={`/books/${book.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <h5 className="card-title fs-6 mb-2">{book.title}</h5>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </article>
    </>
  );
}

import React, { useState, useEffect } from "react";
import bookLogo from "./assets/books.png";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";
import Navigations from "./components/Navigations";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
    if (!status) {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <header>
          <h1>
            <img id="logo-image" src={bookLogo} alt="Book logo" />
            Exclusive Library App
          </h1>
        </header>

        <Navigations
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoggedIn={isLoggedIn}
          updateLoginStatus={updateLoginStatus}
        />

        <main className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <Books searchTerm={searchTerm} isLoggedIn={isLoggedIn} />
              }
            />
            <Route path="/books/:id" element={<SingleBook />} />
            <Route
              path="/login"
              element={<Login updateLoginStatus={updateLoginStatus} />}
            />
            <Route
              path="/register"
              element={<Register updateLoginStatus={updateLoginStatus} />}
            />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </Router>
    </Provider>
  );
}

export default App;

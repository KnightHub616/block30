import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import bookLogo from "./assets/books.png";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";

function App() {
  const [token, setToken] = React.useState(null);

  return (
    <BrowserRouter>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} />
          Library App
        </h1>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import bookLogo from "./assets/books.png";
import { Provider } from "react-redux";
import store from "./components/store";

import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Navigations from "./components/Navigations";

function App() {
  const [token, setToken] = React.useState(null);
 

  return (
    <Provider store={store}>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} />
          Library App
        </h1>
      </header>
      <BrowserRouter >
      <Navigations />
        


{/* //------------------------------------------------------------------------------------// */}
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
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
        </nav> */}

        <Routes>
          <Route path="/" element={<Books />}></Route>
          <Route path="/books/:id" element={<BookDetails />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

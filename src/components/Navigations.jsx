import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigations({
  searchTerm,
  setSearchTerm,
  isLoggedIn,
  updateLoginStatus,
}) {
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateLoginStatus(false);
    setIsSearchExpanded(false);
    navigate("/login");
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded && setSearchTerm) {
      setSearchTerm("");
    }
  };

  const handleSearchChange = (e) => {
    if (setSearchTerm) {
      setSearchTerm(e.target.value);
    }
  };

  const handleSearchBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget) && !searchTerm) {
      setTimeout(() => setIsSearchExpanded(false), 100);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-light sticky-top py-3"
      style={{ borderBottom: "1px solid #dee2e6" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand me-auto">
          Library Home
        </Link>

        <div
          className="d-flex align-items-center me-3"
          onBlur={handleSearchBlur}
        >
          {isSearchExpanded && (
            <input
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Search Books..."
              value={searchTerm || ""}
              onChange={handleSearchChange}
              autoFocus
            />
          )}
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={handleSearchIconClick}
            aria-label={isSearchExpanded ? "Close search" : "Open search"}
          >
            {isSearchExpanded ? "✕" : "🔍"}
          </button>
        </div>

        <div className="navbar-nav">
          {isLoggedIn ? (
            <>
              <Link to="/account" className="nav-link">
                Account
              </Link>
              <button onClick={handleLogout} className="btn btn-link nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

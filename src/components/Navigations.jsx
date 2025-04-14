/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from 'react'



export default function Navigations() {

    
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="./">
              Home
            </a>
          </div>
         </nav>
         <nav>
          <div>
            <button className="navbar-toggler" type="button">
              <span>
                
                <a className="nav-link" href="./login">
                  Login
                </a>
              </span>
            </button>
            </div>
            <div>
            <button className="navbar-toggler" type="button">
              <span>
                
                <a className="nav-link" href="./register" aria-expanded="false">
                  Sign Up
                </a>
              </span>
            </button>
            </div>
          </nav>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>  
    </>
  )
};

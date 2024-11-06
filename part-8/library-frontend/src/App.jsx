import { useState, useEffect } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import RecommendBook from "./components/RecommendBook";

import { useApolloClient } from '@apollo/client';

import './styles/app.css'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('library-user-token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div className="app-container">
      <div className="app-navbar">
        <button
          onClick={() => setPage("authors")}
          className={`app-button`}
          style={{ backgroundColor: page === "authors" ? "#4CAF50" : "#555" }}
        >
          Authors
        </button>
        <button
          onClick={() => setPage("books")}
          className={`app-button`}
          style={{ backgroundColor: page === "books" ? "#4CAF50" : "#555" }}
        >
          Books
        </button>
        {
          token ?
          <>
            <button
              onClick={() => setPage("add")}
              className={`app-button`}
              style={{ backgroundColor: page === "add" ? "#4CAF50" : "#555" }}
            >
              Add book
            </button>
            <button
              onClick={() => setPage("recommend")}
              className={`app-button`}
              style={{ backgroundColor: page === "recommend" ? "#4CAF50" : "#555" }}
            >
              Recommend
            </button>
            <button
              onClick={logout}
              className="app-logout-button"
            >
              Logout
            </button>
          </>
          :
          <button
            onClick={() => setPage("login")}
            className="app-button"
            style={{ backgroundColor: page === "login" ? "#4CAF50" : "#555" }}
          >
            Login
          </button>
        }
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <RecommendBook show={page === "recommend"} />

      <LoginForm setToken={setToken} show={page === "login"} setPage={setPage}/>
    </div>
  );
};

export default App;

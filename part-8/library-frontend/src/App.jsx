import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from '@apollo/client';

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
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {
          token ?
          <>
            <button onClick={() => setPage("add")}>Add book</button>
            <button onClick={logout}>logout</button>
          </>
          :
          <button onClick={() => setPage("login")}>Login</button>
        }
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm setToken={setToken} show={page === "login"} setPage={setPage}/>
    </div>
  );
};

export default App;

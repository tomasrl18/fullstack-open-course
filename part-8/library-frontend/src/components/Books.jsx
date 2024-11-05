/* eslint-disable react/prop-types */
import { ALL_BOOKS } from "../queries"
import { useQuery } from '@apollo/client';

import '../styles/books.css'

const Books = ({ show }) => {
  const booksResult = useQuery(ALL_BOOKS)
  
  if (booksResult.loading)  {
    return <div>loading...</div>
  }
  
  if (!show) {
    return null
  }

  const books = booksResult.data.allBooks

  return (
    <div className="books-container">
      <h2 className="books-title">Books</h2>
      <table className="books-table">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books

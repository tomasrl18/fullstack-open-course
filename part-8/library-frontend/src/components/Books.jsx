/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { ALL_BOOKS } from "../queries"
import { useQuery } from '@apollo/client';

import '../styles/books.css'

const Books = ({ show }) => {
  const genres = [
    {
      name: 'Fantasy',
      value: 'fantasy'
    },
    {
      name: 'Romantasy',
      value: 'romantasy'
    },
    {
      name: 'All',
      value: ''
    }
  ]
  const [filteredGenre, setFilteredGenre] = useState('')

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre: filteredGenre }
  })
  
  if (loading)  {
    return <div>loading...</div>
  }
  
  if (!show) {
    return null
  }

  const books = data.allBooks

  return (
    <div className="books-container">
      <h2 className="books-title">Books</h2>
      <div className="genre-buttons">
        {
          genres.map((genre) => (
            <button
              key={genre.name}
              className={`genre-button ${filteredGenre === genre.value ? 'active' : ''}`}
              onClick={() => setFilteredGenre(genre.value)}
            >
              {genre.name}
            </button>
          ))
        }
      </div>
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

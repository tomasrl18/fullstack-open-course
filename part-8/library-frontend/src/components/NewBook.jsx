/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_BOOKS, CREATE_BOOK } from "../queries"

import '../styles/book-form.css'

const NewBook = ({ show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className="new-book-container">
      <h2 className="new-book-title">Add a New Book</h2>
      <form onSubmit={submit} className="new-book-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter book title"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter author name"
          />
        </div>
        <div className="form-group">
          <label>Published Year</label>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            placeholder="Enter year of publication"
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            placeholder="Add a genre"
          />
          <button onClick={addGenre} type="button" className="add-genre-btn">
            Add Genre
          </button>
        </div>
        <div className="genres-list">Genres: {genres.join(', ')}</div>
        <button type="submit" className="submit-btn">Create Book</button>
      </form>
    </div>
  )
}

export default NewBook
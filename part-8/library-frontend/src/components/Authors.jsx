/* eslint-disable react/prop-types */
import { ALL_AUTHORS } from "../queries"
import { useQuery } from '@apollo/client';

import BornForm from "./BornForm";

import '../styles/auhors.css'

const Authors = ({ show }) => {
  const authorsResult = useQuery(ALL_AUTHORS)
  
  if (authorsResult.loading)  {
    return <div className="loading">loading...</div>
  }
  
  if (!show) {
    return null
  }

  const authors = authorsResult.data.allAuthors

  return (
    <div className="authors-container">
      <h2 className="authors-title">Authors</h2>
      <table className="authors-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BornForm />
    </div>
  )
}

export default Authors

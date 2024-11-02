/* eslint-disable react/prop-types */
import { ALL_AUTHORS } from "../queries"
import { useQuery } from '@apollo/client';

import BornForm from "./BornForm";

const Authors = ({ show }) => {
  const authorsResult = useQuery(ALL_AUTHORS)
  
  if (authorsResult.loading)  {
    return <div>loading...</div>
  }
  
  if (!show) {
    return null
  }

  const authors = authorsResult.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
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

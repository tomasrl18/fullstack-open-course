/* eslint-disable react/prop-types */
import { ALL_BOOKS } from "../queries"
import { useQuery } from '@apollo/client';

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
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books

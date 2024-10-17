import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes, newAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(newAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(increaseVotes(anecdote.id))}>vote</button>
              </div>
            </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            type="text"
            name="anecdote"
            placeholder='Write an anecdote...'
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Add anecdote</button>
      </form>
    </div>
  )
}

export default App
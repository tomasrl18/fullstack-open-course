import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  console.log(newAnecdoteMutation);

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, vottes: 0 })
  }

  return (
    <div>
      <h3>Create a new anecdote</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

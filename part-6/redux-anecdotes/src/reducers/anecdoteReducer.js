import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    increaseVotes(state, action) {
      const id = action.payload

      const anecdoteToChange = state.find(n => n.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote));
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { newAnecdote, increaseVotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
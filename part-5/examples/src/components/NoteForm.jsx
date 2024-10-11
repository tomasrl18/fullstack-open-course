import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }
  
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <div>
          <input
            placeholder="A new note..."
            value={newNote}
            onChange={event => setNewNote(event.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Save</button>
      </form>
    </div>
  )
}

export default NoteForm
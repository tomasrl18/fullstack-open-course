import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState()
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  
  const addNote = (event) => {
    event.preventDefault()

    const note = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    axios
      .post('http://localhost:3001/notes', note)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all' }
        </button>
        <h3>{showAll ? 'Showing all of the notes' : 'Showing the important notes'}</h3>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          placeholder='A new note...'
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
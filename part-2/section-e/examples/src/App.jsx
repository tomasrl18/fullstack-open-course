import { useState, useEffect } from 'react'

import noteService from './services/notes'

import Note from './components/Note'
import Notification from './components/Notificacion'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState([
    {
      message: '',
      type: ''
    }
  ])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  const addNote = (event) => {
    event.preventDefault()

    const note = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    noteService
      .create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')

        const newMessage = {
          message: `Added "${note.content}"`,
          type: 'success'
        }

        setMessage(newMessage)

        removeMessage()
      })
      .catch(error => {
        const newMessage = {
          message: 'An error occurred while adding the note',
          type: 'error'
        }

        setMessage(newMessage)

        removeMessage()
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))

        const newMessage = {
          message: `Changed importance of "${note.content}"`,
          type: 'success'
        }

        setMessage(newMessage)

        removeMessage()
      })
      .catch(error => {
        setNotes(notes.filter(n => n.id !== id))

        const newMessage = {
          message: `The note "${note.content}" was already removed from server`,
          type: 'error'
        }

        setMessage(newMessage)

        removeMessage()
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const removeMessage = () => {
    setTimeout(() => {
      setMessage([
        {
          message: '',
          type: ''
        }
      ])
    }, 5000)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message.message} type={message.type}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all' }
        </button>
        <h3>{showAll ? 'Showing all of the notes' : 'Showing the important notes'}</h3>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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

      <Footer />
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'

import noteService from './services/notes'
import loginService from './services/login'

import Note from './components/Note'
import Notification from './components/Notificacion'
import NoteForm from './components/NoteForm'

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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ message: 'Wrong credentials', type: 'error' })
      removeMessage()
    }
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:&nbsp;
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:&nbsp;
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Login</button>
    </form>      
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message.message} type={message.type}/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            handleNoteChange={handleNoteChange}
          />
        </div>
      }

      <div style={{ marginTop: '1rem' }}>
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

      <Footer />
    </div>
  )
}

export default App
const NoteForm = ({ addNote, newNote, handleNoteChange }) => {
    return (
      <>
        <form onSubmit={addNote}>
            <input
                placeholder="A new note..."
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit" style={{ marginLeft: '1 rem' }}>Save</button>
        </form>
      </>
    )
  }

export default NoteForm
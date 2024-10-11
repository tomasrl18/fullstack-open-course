const NoteForm = ({ onSubmit, value, handleChange }) => {
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <div>
          <input
            placeholder="A new note..."
            value={value}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Save</button>
      </form>
    </div>
  )
}

export default NoteForm
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
    const noteStyle = {
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: note.important ? '#ffeb3b' : '#f8f9fa',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
    }
    
    return (
        <li
            onClick={handleClick}
            style={noteStyle}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#ffe57f';
                e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = note.important ? '#ffeb3b' : '#f8f9fa';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            {note.content}
            <strong style={{ marginLeft: '10px' }}>
                {note.important ? 'Important' : 'Not important'}
            </strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes
        }

        return filter === 'IMPORTANT'
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })

    const notesListStyle = {
        listStyleType: 'none',
        padding: 0,
        margin: '20px 0',
    }

    return (
        <ul style={notesListStyle}>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() =>
                        dispatch(toggleImportanceOf(note.id))
                    }
                />
            )}
        </ul>
    )
}

export default Notes
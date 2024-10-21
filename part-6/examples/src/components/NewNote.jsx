import { useDispatch } from 'react-redux'

import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''

        dispatch(createNote(content))
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0',
    }

    const inputStyle = {
        width: '100%',
        maxWidth: '400px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        outline: 'none',
        transition: 'border-color 0.3s',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
    }

    const buttonStyle = {
        padding: '10px 15px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
    }

    const buttonHoverStyle = {
        backgroundColor: '#218838',
        transform: 'scale(1.05)',
    }

    return (
        <form onSubmit={addNote} style={formStyle}>
            <input
                name="note"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#007BFF')}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                placeholder="Escribe tu nota..."
            />
            <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = buttonHoverStyle.backgroundColor
                    e.target.style.transform = buttonHoverStyle.transform
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = buttonStyle.backgroundColor
                    e.target.style.transform = 'scale(1)'
                }}
            >
                Add
            </button>
        </form>
    )
}

export default NewNote
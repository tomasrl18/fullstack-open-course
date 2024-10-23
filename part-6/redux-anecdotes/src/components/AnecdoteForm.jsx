import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { useNotification, setNotification } from '../NotificationContext'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const [, notificationDispatch] = useNotification();

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(newAnecdote(content))

        setNotification(notificationDispatch, `Added: "${content}"`, 5);
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        outline: 'none',
        transition: 'border-color 0.3s',
    }

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }

    const buttonHoverStyle = {
        backgroundColor: '#45a049',
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Create New Anecdote</h2>
            <form style={formStyle} onSubmit={addAnecdote}>
                <input
                    name="anecdote"
                    placeholder="Write your anecdote here"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
                    onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                >
                    Add
                </button>
            </form>
        </>
    )
}

export default AnecdoteForm
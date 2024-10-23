/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { increaseVotes } from '../reducers/anecdoteReducer'
import { useNotification, setNotification } from '../NotificationContext'

const Anecdote = ({ anecdote, handleClick }) => {
    const anecdoteStyle = {
        backgroundColor: '#f9f9f9',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
    }

    const contentStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    }

    const voteStyle = {
        fontSize: '14px',
        color: '#666',
        marginTop: '5px',
    }

    const buttonStyle = {
        padding: '5px 10px',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
        transition: 'background-color 0.3s',
    }

    
    return (
        <div key={anecdote.id} style={anecdoteStyle}>
            <div style={contentStyle}>
                {anecdote.content}
            </div>
            <div style={voteStyle}>
                Has {anecdote.votes}
                <button
                    onClick={handleClick}
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
                >
                    Vote
                </button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const [, notificationDispatch] = useNotification();

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
    }

    const handleVotes = (anecdote) => {
        dispatch(increaseVotes(anecdote.id))

        setNotification(notificationDispatch, `Anecdote: "${anecdote.content}" voted`, 5);
    }

    return (
        <div style={containerStyle}>
            {[...filteredAnecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => handleVotes(anecdote)}
                    />
                )
            }
        </div>
    )
}

export default Anecdotes
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {
    const dispatch = useDispatch()
    
    const filterSelected = (e) => {
        const value = e.target.value
        dispatch(filterChange(value))
    }

    const inputStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        outline: 'none',
        transition: 'border-color 0.3s',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }

    const placeholderStyle = {
        color: '#aaa',
    }

    const containerStyle = {
        margin: '20px 0',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
    
    return (
        <div style={containerStyle}>
            <input
                type="text"
                name="anecdoteFilter"
                onChange={filterSelected}
                placeholder="Filter by..."
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#007BFF')}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
        </div>
    )
}

export default AnecdoteFilter
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
    const dispatch = useDispatch()

    const filterStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
    }

    const radioStyle = {
        margin: '5px 0',
    }

    return (
        <div style={filterStyle}>
            <label style={radioStyle}>
                <input
                    type="radio"
                    name="filter"
                    onChange={() => dispatch(filterChange('ALL'))}
                />
                all
            </label>
            <label style={radioStyle}>
                <input
                    type="radio"
                    name="filter"
                    onChange={() => dispatch(filterChange('IMPORTANT'))}
                />
                important
            </label>
            <label style={radioStyle}>
                <input
                    type="radio"
                    name="filter"
                    onChange={() => dispatch(filterChange('NONIMPORTANT'))}
                />
                nonimportant
            </label>
        </div>
    )
}

export default VisibilityFilter
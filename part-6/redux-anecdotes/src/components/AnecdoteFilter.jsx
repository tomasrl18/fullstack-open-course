import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {
    const dispatch = useDispatch()
    
    const filterSelected = (e) => {
        const value = e.target.value
        dispatch(filterChange(value))
    }
    
    return (
        <>
            <input type="text" name="anecdoteFilter" onChange={filterSelected} placeholder="Filter by..."/>
        </>
    )
}

export default AnecdoteFilter
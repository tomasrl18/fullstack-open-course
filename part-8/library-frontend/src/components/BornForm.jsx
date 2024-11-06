import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { ALL_AUTHORS, EDIT_BORN } from '../queries'

import Select from 'react-select';

import '../styles/born-form.css'

const BornForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const { loading, data } = useQuery(ALL_AUTHORS)

    const [ changeBorn ] = useMutation(EDIT_BORN, {
        refetchQueries: [ { query: ALL_AUTHORS } ],
    })

    if (loading) return <div>Loading...</div>

    const authorOptions = data.allAuthors.map(author => ({
        value: author.name,
        label: author.name
    }))

    const submit = (event) => {
        event.preventDefault()
    
        changeBorn({ variables: { name, setBornTo: parseInt(born) } })
    
        setName('')
        setBorn('')
    }
    
    return (
        <div className="born-form-container">
            <h2 className="form-title">Change Born Date</h2>

            <form onSubmit={submit} className="born-form">
                <div className="form-group">
                    <label>Author</label>
                    <Select
                        value={authorOptions.find(option => option.value === name)}
                        onChange={(selectedOption) => setName(selectedOption.value)}
                        options={authorOptions}
                        placeholder="Select author"
                    />
                </div>
                
                <div className="form-group">
                    <label>Born</label>
                    <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                        placeholder="Enter birth year"
                    />
                </div>
                <button type='submit' className="submit-btn">Change born date</button>
            </form>
        </div>
    )
}

export default BornForm
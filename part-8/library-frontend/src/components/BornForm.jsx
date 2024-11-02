import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const BornForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ changeBorn ] = useMutation(EDIT_BORN, {
        refetchQueries: [ { query: ALL_AUTHORS } ],
    })

    const submit = (event) => {
        event.preventDefault()
    
        changeBorn({ variables: { name, setBornTo: parseInt(born) } })
    
        setName('')
        setBorn('')
    }
    
    return (
        <div>
            <h2>Change born date</h2>

            <form onSubmit={submit}>
                <div>
                name <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
                </div>
                <div>
                born <input
                    type='number'
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
                </div>
                <button type='submit'>Change born date</button>
            </form>
        </div>
    )
}

export default BornForm
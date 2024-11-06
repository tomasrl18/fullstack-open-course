/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

import '../styles/login-form.css'

const LoginForm = ({ setToken, show, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setPage('authors');
        }
    }, [result.data]) // eslint-disable-line

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    return (
        <div className="login-form-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={submit} className="login-form">
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button type='submit' className="login-btn">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
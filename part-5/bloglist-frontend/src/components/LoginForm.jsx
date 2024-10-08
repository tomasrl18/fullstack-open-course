const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
    <form onSubmit={handleLogin}>
        <h4>Log in to application</h4>
        <div>
            Username:&nbsp;
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            Password:&nbsp;
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Login</button>
    </form>
  )
  
  export default LoginForm
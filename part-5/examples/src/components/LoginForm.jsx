const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username:&nbsp;
          <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          Password:&nbsp;
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

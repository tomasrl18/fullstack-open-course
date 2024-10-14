import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
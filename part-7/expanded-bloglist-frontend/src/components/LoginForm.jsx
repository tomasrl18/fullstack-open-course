const LoginForm = ({
  handleSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => (
  <form onSubmit={handleSubmit}>
    <h4>Log in to application</h4>
    <div>
      Username:&nbsp;
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
        data-testid="username"
      />
    </div>
    <div>
      Password:&nbsp;
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
        data-testid="password"
      />
    </div>
    <button type="submit" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
      Login
    </button>
  </form>
);

export default LoginForm;

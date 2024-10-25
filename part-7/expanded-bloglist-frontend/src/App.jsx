import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, createBlog, likeBlog, removeBlog } from "./store/blogSlice";
import { setNotification, clearNotification } from "./store/notificationSlice";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogs());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(
        setNotification({ message: "Wrong credentials", type: "error" }),
      );
      removeMessage();
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleAddBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    dispatch(createBlog(blogObject))
      .then(() => {
        dispatch(
          setNotification({
            message: `Added "${blogObject.title}"`,
            type: "success",
          }),
        );
        removeMessage();
      })
      .catch(() => {
        dispatch(
          setNotification({
            message: "An error occurred while adding the blog",
            type: "error",
          }),
        );
        removeMessage();
      });
  };

  const handleUpdateLikes = (id) => {
    dispatch(likeBlog(id))
  };

  const handleDeleteBlog = (id) => {
    dispatch(removeBlog(id));
  };

  const removeMessage = () => {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
          Logout
        </button>

        <br />

        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm createBlog={handleAddBlog} />
        </Togglable>

        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleUpdateLikes={() => handleUpdateLikes(blog.id)}
              handleDeleteBlog={() => handleDeleteBlog(blog.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;

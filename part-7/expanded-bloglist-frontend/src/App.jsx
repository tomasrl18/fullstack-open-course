import { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, createBlog, likeBlog, removeBlog } from "./store/blogSlice";
import { setNotification, clearNotification } from "./store/notificationSlice";
import { loginUser, logoutUser, setUser } from "./store/userSlice";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser({ username, password }));
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
    dispatch(logoutUser());
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

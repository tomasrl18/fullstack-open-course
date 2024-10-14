import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([
    {
      message: '',
      type: ''
    }
  ])

  useEffect(() => {
    if(user) {
      blogService
        .getAll()
        .then(blogs =>
          setBlogs(blogs)
        )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setMessage({ message: 'Wrong credentials', type: 'error' })
      removeMessage()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null)
  }

  const handleAddBlog = (blogObject) => {
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage({
          message: `Added "${returnedBlog.title}"`,
          type: 'success'
        })

        removeMessage()
      })
      .catch(() => {
        setMessage({
          message: 'An error occurred while adding the blog',
          type: 'error'
        })

        removeMessage()
      })
  }

  const removeMessage = () => {
    setTimeout(() => {
      setMessage([
        {
          message: '',
          type: ''
        }
      ])
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message.message} type={message.type}/>
        <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message.message} type={message.type}/>
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>Logout</button>
          
          <br />

          <Togglable buttonLabel='New blog'>
            <BlogForm
              createBlog={handleAddBlog}
            />
          </Togglable>
          
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} user={user} />
            )
          }
        </div>
    </div>
  )
}

export default App
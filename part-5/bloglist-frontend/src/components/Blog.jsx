import { useState } from 'react'

import BlogDetails from './BlogDetails'

const Blog = ({ blog, user, handleUpdateLikes, handleDeleteBlog }) => {
  const [isDetailled, setIsDetailled] = useState(false)

  const handleDetails = () => {
    setIsDetailled(!isDetailled)
  }

  return (
    <div className="blogContainer">
      <li className="blogItem">
        <strong className="title">Título:</strong> {blog.title}
        <button
          style={{ marginLeft: '1rem' }}
          onClick={handleDetails}
        >
          {isDetailled ? 'Hide details' : 'View details'}
        </button>
      </li>

      {
        isDetailled
        ? <BlogDetails blog={blog} user={user} handleUpdateLikes={handleUpdateLikes} handleDeleteBlog={handleDeleteBlog} />
        : ''
      }
    </div>
  )
}

Blog.propTypes = {
  handleUpdateLikes: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
import { useState } from 'react'

import BlogDetails from './BlogDetails'

const Blog = ({ blog, user, handleUpdateLikes }) => {
  const [isDetailled, setIsDetailled] = useState(false)

  const handleDetails = () => {
    setIsDetailled(!isDetailled)
  }

  return (
    <div className="blogContainer">
      <li className="blogItem">
        <strong className="title">Título:</strong> {blog.title}
        &nbsp;<strong className="details">Autor:</strong> {blog.author == 'Me' ? user.name : blog.author}
        <button
          style={{ marginLeft: '1rem' }}
          onClick={handleDetails}
        >
          {isDetailled ? 'Hide details' : 'View details'}
        </button>
      </li>

      {
        isDetailled
        ? <BlogDetails blog={blog} handleUpdateLikes={handleUpdateLikes} />
        : ''
      }
    </div>
  )
}

export default Blog
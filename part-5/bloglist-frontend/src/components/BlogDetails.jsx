import PropTypes from 'prop-types'

const BlogDetails = ({ blog, user, handleUpdateLikes, handleDeleteBlog }) => {
    const confirmDelete = () => {
        if (window.confirm(`Do you really want to delete the blog "${blog.title}"?`)) {
          handleDeleteBlog(blog.id)
        }
    }
    
    return (
        <>
            <li className='blogItem'>
                <strong className="details">Likes: </strong> {blog.likes}
                <button
                    onClick={() => handleUpdateLikes(blog.id)}
                    style={{ marginLeft: '0.5rem' }}
                >
                    Like
                </button>
            </li>
            <li className='blogItem'>
                <strong className="details">URL: </strong> {blog.url}
            </li>
            <li className='blogItem'>
                <strong className="details">Creator name: </strong> {user.name}
            </li>

            {
                blog.user && (blog.user.name == user.name)
                ?
                    <button onClick={confirmDelete} style={{ marginTop: '0.5rem' }}>
                        Delete
                    </button>
                :
                    ''
            }
        </>
    )
}

BlogDetails.propTypes = {
    handleUpdateLikes: PropTypes.func.isRequired,
    handleDeleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    blog: PropTypes.object.isRequired
}

export default BlogDetails
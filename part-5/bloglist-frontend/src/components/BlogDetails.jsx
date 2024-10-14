const BlogDetails = ({ blog, handleUpdateLikes }) => {
    return(
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
        </>
    )
}

export default BlogDetails
const BlogDetails = ({ blog, user, handleUpdateLikes }) => {
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
            <li className='blogItem'>
                <strong className="details">Creator name: </strong> {blog.author == 'Me' ? user.name : blog.author}
            </li>
        </>
    )
}

export default BlogDetails
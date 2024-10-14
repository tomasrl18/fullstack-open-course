const BlogDetails = ({ likes, url }) => {
  return (
    <>
      <li className='blogItem'>
        <strong className="details">Likes: </strong> {likes}
        <button
          style={{ marginLeft: '0.5rem' }}
        >
          Like
        </button>
      </li>
      <li className='blogItem'>
        <strong className="details">URL: </strong> {url}
      </li>
    </>
  )
}

export default BlogDetails
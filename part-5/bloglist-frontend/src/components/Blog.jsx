const Blog = ({ blog, user }) => (
  <div className="blogContainer">
    <li className="blogItem">
      <strong className="title">Título:</strong> {blog.title}
      &nbsp;<strong className="author">Autor:</strong> {blog.author == 'Me' ? user.name : blog.author}
    </li>
  </div>  
)

export default Blog
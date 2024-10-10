const AddBlog = ({ handleAddBlog, title, setTitle, author, setAuthor, url, setUrl }) => (
    <form onSubmit={handleAddBlog}>
        <h3>Create a new blog</h3>
        <div>
            Title:&nbsp;
            <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            Author:&nbsp;
            <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            Url:&nbsp;
            <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Add</button>
    </form>
  )
  
  export default AddBlog
import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
    
        createBlog({
          title: title,
          author: author,
          url: url
        })
    
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create a new blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    Title:&nbsp;
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="What do you want?"
                        data-testid='title'
                    />
                </div>
                <div>
                    Author:&nbsp;
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder="Some author"
                        data-testid='author'
                    />
                </div>
                <div>
                    Url:&nbsp;
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="Some url"
                        data-testid='url'
                    />
                </div>
                <button type="submit" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                    Add
                </button>
            </form>
        </div>
    )
}
  
export default BlogForm
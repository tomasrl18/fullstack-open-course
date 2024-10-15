import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('What do you want?')
    const authorInput = screen.getByPlaceholderText('Some author')
    const urlInput = screen.getByPlaceholderText('Some url')
    const sendButton = screen.getByText('Add')

    await user.type(titleInput, 'Testing the title...')
    await user.type(authorInput, 'Testing the auhor...')
    await user.type(urlInput, 'Testing the url...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing the title...')
})
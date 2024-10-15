/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('blog', () => {
    let container;
    
    const blog = {
        title: 'A new blog',
        author: 'Someone',
        url: 'http://yeah-i-think-its-ok.com',
        likes: 143,
        user: '67041e52aec3bb1cec1fb6fa'
    }

    const user = {
        name: 'Someone',
        username: 'someone1992'
    }

    const mockHandler = vi.fn()

    beforeEach(() => {
        container = render(
            <Blog blog={blog} user={user} handleUpdateLikes={mockHandler} handleDeleteBlog={mockHandler} />
        ).container
    })
    
    test('renders content', async () => {
      const titleElement = screen.getByText('A new blog')
      expect(titleElement).toBeDefined()
    
      const urlElement = screen.queryByText('http://yeah-i-think-its-ok.com')
      const likesElement = screen.queryByText('likes 143')
    
      expect(urlElement).toBeNull()
      expect(likesElement).toBeNull()
    })
    
    test('showing details when click', async () => {
        const clickerUser = userEvent.setup()
        const button = screen.getByText('View details')
        await clickerUser.click(button)
    
        const urlElement = screen.getByText('http://yeah-i-think-its-ok.com')
        const likesElement = screen.getByText('143')

        expect(urlElement).toBeDefined()
        expect(likesElement).toBeDefined()
    })
})

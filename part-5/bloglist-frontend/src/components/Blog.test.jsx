/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

test('renders content', async () => {
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

  render(<Blog blog={blog} user={user} handleUpdateLikes={mockHandler} handleDeleteBlog={mockHandler} />)

  const titleElement = screen.getByText('A new blog')
  expect(titleElement).toBeDefined()

  const urlElement = screen.queryByText('http://yeah-i-think-its-ok.com')
  const likesElement = screen.queryByText('likes 143')

  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Note from './Note'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = vi.fn()

  render(<Note important={note.important} content={note.content} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
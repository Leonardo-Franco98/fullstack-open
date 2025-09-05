import AddBlogForm from './AddBlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('AddBlogForm component - when clicking the create blog button, the callback is called once with the correct arguments', async () => {

  const user = userEvent.setup()
  const handleCreateClick = vi.fn()

  render(<AddBlogForm handleCreateClick={handleCreateClick} />)

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')

  await user.type(titleInput, 'new blog title')
  await user.type(authorInput, 'new blog author')
  await user.type(urlInput, 'new blog url')

  const createBtn = screen.queryByText('Create', { exact: true })

  await user.click(createBtn)

  expect(handleCreateClick.mock.calls).toHaveLength(1)
  expect(handleCreateClick.mock.calls[0][0].title).toBe('new blog title')
  expect(handleCreateClick.mock.calls[0][0].author).toBe('new blog author')
  expect(handleCreateClick.mock.calls[0][0].url).toBe('new blog url')
})
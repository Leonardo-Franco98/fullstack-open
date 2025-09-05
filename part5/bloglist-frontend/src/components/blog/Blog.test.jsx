import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Blog component - render title and author by default but not number of likes or url', () => {
  const blog = {
    id: '123234',
    title: 'test blog title',
    author: 'author of the blog',
    likes: 4,
    url: 'test.com/blogs/11',
    user: {
      id: 1,
      username: 'leonardofranco'
    }
  }

  render(<Blog blog={blog} />)

  const title = screen.queryByText(blog.title, { exact: false })
  const author = screen.queryByText(blog.author, { exact: false })
  const likes = screen.queryByText(`${blog.likes} likes`, { exact: false })
  const url = screen.queryByText(blog.url, { exact: false })

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(likes).toBeNull()
  expect(url).toBeNull()
})

test('Blog component - likes and url are rendered after clicking the show details button', async () => {
  const blog = {
    id: '123234',
    title: 'test blog title',
    author: 'author of the blog',
    likes: 4,
    url: 'test.com/blogs/11',
    user: {
      id: 1,
      username: 'leonardofranco'
    }
  }

  const user = userEvent.setup()

  render(<Blog blog={blog} />)

  const btn = screen.queryByText('show details')

  await user.click(btn)

  const likes = screen.queryByText(`${blog.likes} likes`, { exact: false })
  const url = screen.queryByText(blog.url, { exact: false })

  expect(likes).toBeDefined()
  expect(url).toBeDefined()
})

test('Blog component - clicking the like button twice makes two calls to the callback passed to be called when this button is clicked', async () => {
  const blog = {
    id: '123234',
    title: 'test blog title',
    author: 'author of the blog',
    likes: 4,
    url: 'test.com/blogs/11',
    user: {
      id: 1,
      username: 'leonardofranco'
    }
  }

  const user = userEvent.setup()
  const handleLikeClick = vi.fn()

  render(<Blog blog={blog} handleLikeClick={handleLikeClick} />)

  const showBtn = screen.queryByText('show details')
  await user.click(showBtn)

  const likeBtn = screen.queryByText('like')
  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(handleLikeClick.mock.calls).toHaveLength(2)
})
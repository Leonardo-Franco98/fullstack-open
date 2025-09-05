import { useState } from 'react'

const AddBlogForm = ({ handleCreateClick }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetStateCreateBlog = () => {
    handleCreateClick({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new entry</h2>
      <div>
        <label>
          title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          url:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
      </div>
      <button onClick={resetStateCreateBlog}>Create</button>
    </div>
  )
}

export default AddBlogForm
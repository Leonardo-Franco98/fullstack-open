import { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, handleLikeClick, handleDeleteClick, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => setShowDetails(!showDetails)

  return (
    <div className='blog'>
      <p>{blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide details' : 'show details'}</button></p>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={() => handleLikeClick(blog.id)}>like</button></p>
          <p>{blog.user.username}</p>
          {user === blog.user.username && <button onClick={() => handleDeleteClick(blog.id)}>delete</button>}
        </>
      )}
    </div>
  )
}

export default Blog
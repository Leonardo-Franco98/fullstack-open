import Blog from './blog/Blog'

const BlogList = ({ blogs, user, handleLogoutClick, handleLikeClick, handleDeleteClick }) => {
  return (
    <>
      <h2>blogs</h2>
      <p>{user} logged in <button onClick={handleLogoutClick}>logout</button> </p>
      <div className="blogList">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLikeClick={handleLikeClick} handleDeleteClick={handleDeleteClick} user={user} />
        )}
      </div>
    </>
  )
}

export default BlogList
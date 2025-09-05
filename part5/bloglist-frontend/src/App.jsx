import { useState, useEffect } from 'react'
import Notification from './components/notification/Notification'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/add_blog_form/AddBlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import authService from './services/auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(false)
  const [notifMessage, setNotifMessage] = useState(null)

  useEffect(() => {
    let user = window.localStorage.getItem('bloglistappuser')

    if (user) {
      setUser(JSON.parse(user))
      authService.setToken(JSON.parse(user).token)
    }
  }, [])

  useEffect(() => {
    blogService.getAllBlogs().then(blogs => {
      blogs = blogs.sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0)
      setBlogs(blogs)
    })
  }, [])

  const handleLoginSubmit = async (credentials) => {
    try {
      const result = await authService.login(credentials)

      setUser(result.data)
      authService.setToken(result.data.token)
      window.localStorage.setItem('bloglistappuser', JSON.stringify(result.data))
      showMessage(true, `Logged in as ${result.data.username}`)
    } catch (e) {
      if (e.status === 401) {
        showMessage(false, e.response.data.error)
        return
      }
    }
  }

  const handleLogoutClick = () => {
    window.localStorage.removeItem('bloglistappuser')
    showMessage(true, 'Logged out')
    setUser(null)
  }

  const handleCreateClick = async (newBlog) => {
    try {
      let result = await blogService.createBlog(newBlog)
      result.data.user = { username: user.username }

      setBlogs([...blogs, result.data])
      showMessage(true, 'New blog created successfully')
    } catch (e) {
      if (e.status === 400) {
        showMessage(false, e.response.data.error)
        return
      }
    }
  }

  const handleLikeClick = async (id) => {
    let blog = blogs.find(b => b.id === id)
    blog.likes++

    try {
      await blogService.updateBlog(id, blog)

      showMessage(true, `${blog.title} liked`)

      setBlogs(blogs.sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0))
    } catch (e) {
      if (e.status === 400) {
        blog.likes--
        showMessage(false, e.response.data.error)
        return
      }
    }
  }

  const handleDeleteClick = async (id) => {
    let blog = blogs.find(b => b.id === id)
    let confirm = window.confirm(`Are you sure you want to permanentely delete the blog ${blog.title}`)

    if (!confirm) return

    try {
      await blogService.deleteBlog(id)

      setBlogs(blogs.filter(b => b.id !== id))
      showMessage(true, `${blog.title} deleted`)
    } catch (e) {
      if (e.status === 400) {
        showMessage(false, e.response.data.error)
        return
      }
    }
  }

  const showMessage = (success, message) => {
    setSuccess(success)
    setNotifMessage(message)
    setTimeout(() => setNotifMessage(null), 5000)
  }

  return (
    <div>
      {notifMessage && <Notification success={success} message={notifMessage} />}
      {!user &&
        <LoginForm handleLoginSubmit={handleLoginSubmit} />
      }
      {user &&
        <div>
          <Toggleable buttonText='Create new blog'>
            <AddBlogForm handleCreateClick={handleCreateClick} />
          </Toggleable>
          <BlogList
            blogs={blogs}
            user={user.username}
            handleLogoutClick={handleLogoutClick}
            handleLikeClick={handleLikeClick}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      }
    </div>
  )
}

export default App
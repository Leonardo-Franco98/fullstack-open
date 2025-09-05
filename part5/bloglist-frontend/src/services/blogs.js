import axios from 'axios'
import authService from './auth'

const baseUrl = '/api/blogs'

const getAllBlogs = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
}

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, { headers: { 'Authorization': `Bearer ${authService.getToken()}` } })

  return response
}

const updateBlog = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, { headers: { 'Authorization': `Bearer ${authService.getToken()}` } })

  return response
}

const deleteBlog = async (id) => {
  const response = axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `Bearer ${authService.getToken()}` } })

  return response
}

export default { getAllBlogs, createBlog, updateBlog, deleteBlog }
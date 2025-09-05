import axios from 'axios'

const baseUrl = '/api/auth'
let token = null

const getToken = () => token
const setToken = newToken => token = newToken

const login = async (credentials) => {
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const response = await axios.post(baseUrl, credentials, config)

  return response
}

export default { login, setToken, getToken }
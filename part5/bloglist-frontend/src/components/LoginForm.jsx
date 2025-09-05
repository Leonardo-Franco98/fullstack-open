import { useState } from 'react'

const LoginForm = ({ handleLoginSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetStateLogin = () => {
    handleLoginSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login to bloglist app</h2>
      <div>
        <label>
          username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button onClick={resetStateLogin}>login</button>
    </div>
  )
}

export default LoginForm
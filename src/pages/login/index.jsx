import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const login = async (data) => {
    try {
      const response = await axios.post('http://localhost:3003/api/auth/login', data, { withCredentials: true });
      const result = response.data;  // Adjusted to .data for Axios
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      const { token } = await login(data);
      navigate('/', { state: { token } });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name='username' autoComplete='off' required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name='password' required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
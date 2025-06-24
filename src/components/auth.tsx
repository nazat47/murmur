import React from 'react'
import axios from 'axios'
import { apiUrl } from '../config'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = React.useState(false)
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  })

  const [registerData, setRegisterData] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${apiUrl}/user/login`, loginData)
      localStorage.setItem('murmurAccessToken', data.accessToken)
      setLoginData({ email: '', password: '' })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${apiUrl}/user`, registerData)
      setIsLogin(true)
      setRegisterData({ name: '', email: '', password: '' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-stone-700">
      {isLogin ? (
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md flex flex-col gap-4"
        >
          <input
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            type="text"
            placeholder="Email"
            className="p-2 rounded focus:outline-none border"
          />
          <input
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            type="password"
            placeholder="Password"
            className="p-2 rounded focus:outline-none border"
          />
          <button className="p-2 bg-blue-500 rounded text-white cursor-pointer">
            Login
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleRegister}
          className="bg-white p-6 rounded shadow-md flex flex-col gap-3 "
        >
          <input
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
            type="text"
            placeholder="Name"
            className="p-2 rounded focus:outline-none border"
          />
          <input
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
            type="email"
            placeholder="Email"
            className="p-2 rounded focus:outline-none border"
          />
          <input
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            type="password"
            placeholder="Password"
            className="p-2 rounded focus:outline-none border"
          />
          <button className="p-2 bg-blue-500 rounded text-white cursor-pointer">
            Register
          </button>
        </form>
      )}
      <button
        onClick={() => setIsLogin((prev) => !prev)}
        className="mt-4 text-white cursor-pointer bg-stone-800 hover:bg-stone-900 px-4 py-2 rounded"
      >
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  )
}

export default Auth

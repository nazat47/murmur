import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('murmurAccessToken')
  console.log(token)
  return token ? <Navigate to="/" replace /> : children
}

export default AuthRoute

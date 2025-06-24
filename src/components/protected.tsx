import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('murmurAccessToken')

  return token ? children : <Navigate to="/auth" replace />
}

export default Protected

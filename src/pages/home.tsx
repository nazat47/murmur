import React from 'react'
import Users from '../components/users'
import Timeline from '../components/timeline'
import Profile from '../components/profile'

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-x-hidden flex divide-x divide-gray-300">
      <Users />
      <Timeline />
      <Profile />
    </div>
  )
}

export default Home

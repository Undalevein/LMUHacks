import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar' 
import './App.css'
import { useAuthentication } from './services/authService'
import RequestFeed from './components/RequestFeed'


function App() {
  const user = useAuthentication()
  return (
    <div>
      <Navbar user={user} />
      <Outlet />
    </div>
  )
}

export default App

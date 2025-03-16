import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import RequestFeed from './components/RequestFeed'

function App() {
  return (
    <div>
      <Navbar />
      <RequestFeed />
    </div>
  )
}

export default App

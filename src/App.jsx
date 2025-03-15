import React from 'react'
// If you want to set up React Router now, uncomment these lines:
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Profile from './components/Profile'
import CreateRequest from './components/CreateRequest'
import './App.css'

function App() {
  return (
    <div>
      {/* Uncomment the router when you're ready to use React Router:
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-request" element={<CreateRequest />} />
        </Routes>
      </Router>
      */}

      {/* For now, just show the Navbar + Home if you haven't set up routing yet: */}
      <Navbar />
      <Home />
    </div>
  )
}

export default App

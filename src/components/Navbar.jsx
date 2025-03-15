import React from 'react'
// If using React Router for navigation:
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#ccc' }}>
      <h2>LMU Student Requests</h2>
      {/* Uncomment these if using React Router */}
      {/* 
      <Link to="/">Home</Link> | {' '}
      <Link to="/profile">Profile</Link> | {' '}
      <Link to="/create-request">Create Request</Link>
      */}
    </nav>
  )
}

export default Navbar

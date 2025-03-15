import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#ccc' }}>
      <Link to="/">Home</Link> | {' '}
      <Link to="/profile">Profile</Link> | {' '}
      <Link to="/create-request">Create Request</Link>
    </nav>
  )
}

export default Navbar

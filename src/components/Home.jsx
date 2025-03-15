import React from 'react'
import RequestFeed from './RequestFeed'

function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome to the Student Requests App</h1>
      <p>Here, students can post and view various types of requests.</p>
      <RequestFeed />
    </div>
  )
}

export default Home

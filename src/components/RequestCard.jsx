import React from 'react'

function RequestCard({ request }) {
  return (
    <div className="request-card">
      <h3>{request.title}</h3>
      <p>{request.description}</p>
      <span className="category">{request.category}</span>
    </div>
  )
}

export default RequestCard

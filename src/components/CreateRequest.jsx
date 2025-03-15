import React from 'react'

function CreateRequest() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Request submitted!')
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create a New Request</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Request Title:<br />
            <input type="text" name="title" />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Request Description:<br />
            <textarea name="description" rows="4" />
          </label>
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  )
}

export default CreateRequest

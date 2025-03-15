import React, { useState } from 'react'

function CreateRequest() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const categories = ['ride', 'student', 'study', 'textbook', 'tutor']

  const handleSubmit = (e) => {
    e.preventDefault()
    // Supabase stuff
    console.log('Request submitted!', { title, description, category })
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create a New Request</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          
          <label>
            Request Title:<br />
            <input 
              type="text" 
              name="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          
        </div>
        <div style={{ marginBottom: '1rem' }}>
          
          <label>
            Request Description:<br />
            <textarea 
              name="description" 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

        </div>
        <div style={{ marginBottom: '1rem' }}>
          
          <label>
            Request Category:
          </label>
          <div style={{ marginTop: '0.5rem' }}>
            {categories.map((cat) => (
              <button 
                key={cat} 
                type="button" 
                onClick={() => setCategory(cat)}
                style={{ 
                  marginRight: '0.5rem', 
                  background: category === cat ? '#ccc' : '#eee' 
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  )
}

export default CreateRequest

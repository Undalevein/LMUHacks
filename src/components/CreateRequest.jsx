import React, { useState } from 'react'

function CreateRequest() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const categories = ['ride', 'major', 'study', 'textbook', 'tutor']

  const handleSubmit = (e) => {
    e.preventDefault()
    // Supabase stuff
    console.log('Request submitted!', { title, description, category })
  }

  return (
    <div header>
      <h2>Create a New Request</h2>
      <form onSubmit={handleSubmit}>
        <div title>
          
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
        <div desc>
          
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
        <div labels>
          
          <label>
            Request Category:
          </label>
          <div buttons>
            {categories.map((cat) => (
              <button 
                key={cat} 
                type="button" 
                onClick={() => setCategory(cat)}
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

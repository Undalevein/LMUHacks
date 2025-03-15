import { useState, useEffect, useRef } from 'react'

function RequestFeed() {
  const [filter, setFilter] = useState('all')
  const [requests, setRequests] = useState([])
  const feedEndRef = useRef(null)

  // dummy data while supabase is not set up
  const dummyRequests = [
    { id: 1, title: 'TJ', category: 'ride', description: 'want to go to trader joes at 9 pm' },
    { id: 2, title: 'stats midterm', category: 'study', description: 'need someone to study with for math361 midterm' },
    { id: 3, title: 'cs tutor', category: 'tutor', description: 'need help with my ai hw' },
    { id: 4, title: 'animation major', category: 'major', description: 'looking for an animation major for my projects' },
    { id: 5, title: 'calc 2 textbook', category: 'textbook', description: 'can i borrow someones textbook' },
  ]

  useEffect(() => {
    // replace w supabase
    setRequests(dummyRequests)
  }, [])


  // filter
  const filteredRequests = requests.filter(req => filter === 'all' || req.category === filter)
  const categories = ['all', 'ride', 'major', 'study', 'textbook', 'tutor']


  return (
    <div className="request-feed">
      <h2>Request Feed</h2>

      <div className="filter-buttons">
        
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
          >

            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}

      </div>

      <div className="feed">
        {filteredRequests.map(req => (
          <div key={req.id} className="request-item">
            <h3>{req.title}</h3>
            
            <p>
              <strong>Category:</strong> {req.category.charAt(0).toUpperCase() + req.category.slice(1)}
            </p>

            <p>{req.description}</p>
          
          </div>
        ))}
      </div>
    </div>
  )
}

export default RequestFeed

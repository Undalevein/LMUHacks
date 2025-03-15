import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';

function RequestFeed() {
  const [filter, setFilter] = useState('all');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "requests"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRequests(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const filteredRequests = requests.filter(req => filter === 'all' || req.category === filter);
  const categories = ['all', 'ride', 'major', 'study', 'textbook', 'tutor'];

  return (
    <div className="request-feed">
      <h2>Request Feed</h2>

      <div className="filter-buttons">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="feed">
        {filteredRequests.map(req => (
          <div key={req.id} className="request-item">
            <h3>{req.title}</h3>
            <p><strong>Category:</strong> {req.category}</p>
            <p>{req.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestFeed;

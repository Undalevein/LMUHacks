import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

function RequestFeed() {
  const [filter, setFilter] = useState('all');
  const [requests, setRequests] = useState([]);

  // get requests from firestore
  useEffect(() => {
    
    const q = query(collection(db, "requests"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {

      setRequests(
        querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      );

    });

    return () => unsubscribe();
  }, []);

  // filter by category
  const filteredRequests = requests.filter(
    req => filter === 'all' || req.category === filter

  );

  const filterCategories = ['all', 'ride', 'major', 'study', 'textbook', 'tutor'];

  const categoryDescriptions = {
    ride: "I Need a Ride",
    major: "Looking For Specific Major",
    study: "I Want to Study",
    textbook: "Borrow a Textbook or Resource",
    tutor: "I Need a Tutor"
  };


  // delete req
  const handleAccept = async (requestId) => {
    try {
      await deleteDoc(doc(db, "requests", requestId));
      console.log("Request deleted: ", requestId);
    } catch (error) {
      console.error("Error deleting request: ", error);
    }
  };


  return (
    <div className="request-feed" style={{ padding: '1rem' }}>
      <h2>Request Feed</h2>
      
      <div className="filter-buttons" style={{ marginBottom: '1rem' }}>

        {filterCategories.map(cat => (
          
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{ marginRight: '0.5rem' }}
          >

            {cat === 'all' ? 'All' : cat}

          </button>
        ))}

      </div>

      <div className="feed">

        {filteredRequests.map(req => (
          
          <div
            key={req.id}
            className="request-item"
            style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}
          >

            <h3>{req.title}</h3>
            
            <p>
              <strong>Category:</strong> {categoryDescriptions[req.category] || req.category}
            </p>

            <p>{req.description}</p>
            
            <button onClick={() => handleAccept(req.id)}>I can do this</button>
          
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestFeed;

import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

function RequestFeed({ user }) {
  const [filter, setFilter] = useState('all');
  const [requests, setRequests] = useState({});
  const [comments, setComments] = useState({}); // Stores comments for each request
  const [newComments, setNewComments] = useState({}); // Stores input text for each request

  useEffect(() => {
    const q = query(collection(db, "requests"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let requestData = {};
      querySnapshot.docs.forEach((doc) => {
        requestData[doc.id] = { id: doc.id, ...doc.data() };
      });
      setRequests(requestData);
    });

    return () => unsubscribe();
  }, []);

  // Load comments for a request in real-time
  useEffect(() => {
    Object.keys(requests).forEach((requestId) => {
      const commentsRef = collection(db, "requests", requestId, "comments");
      const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
        setComments((prev) => ({
          ...prev,
          [requestId]: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        }));
      });

      return () => unsubscribe();
    });
  }, [requests]);

  // Handle comment input change
  const handleCommentChange = (requestId, text) => {
    setNewComments((prev) => ({ ...prev, [requestId]: text }));
  };

  // Add a comment to Firestore
  const handleAddComment = async (requestId) => {
    if (!newComments[requestId]?.trim()) return;
    try {
      await addDoc(collection(db, "requests", requestId, "comments"), {
        text: newComments[requestId],
        timestamp: serverTimestamp(),
      });
      setNewComments((prev) => ({ ...prev, [requestId]: "" })); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle request deletion
  const handleDeleteRequest = async (requestId) => {
    try {
      // Delete the request document
      await deleteDoc(doc(db, "requests", requestId));
      // Optionally, delete the comments associated with the request
      // await deleteCollection(doc(db, "requests", requestId, "comments"));
      console.log("Request deleted successfully!");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const filteredRequests = Object.values(requests).filter(req => filter === 'all' || req.category === filter);
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

            {/* Comment Section */}
            <div className="comments-section">
              <h4>Comments</h4>
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComments[req.id] || ""}
                  onChange={(e) => handleCommentChange(req.id, e.target.value)}
                />
                <button onClick={() => handleAddComment(req.id)}>Submit</button>
              </div>
              <div className="comments-list">
                {comments[req.id]?.map(comment => (
                  <div key={comment.id} className="comment">
                    <p>{comment.text}</p>
                    {comment.timestamp && (
                      <small>{new Date(comment.timestamp.seconds * 1000).toLocaleString()}</small>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delete button */}
            {user.uid === req.userId && (
              <button onClick={() => handleDeleteRequest(req.id)} className="delete-btn">
                Delete Request
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestFeed;

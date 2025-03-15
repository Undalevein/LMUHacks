import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function CreateRequest() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const categories = ['ride', 'major', 'study', 'textbook', 'tutor'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "requests"), {
        title,
        description,
        category,
        timestamp: serverTimestamp(),
      });

      setTitle('');
      setDescription('');
      setCategory('');
      alert("Request added successfully!");
    } catch (error) {
      console.error("Error adding request: ", error);
    }
  };

  return (
    <div>
      <h2>Create a New Request</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateRequest;

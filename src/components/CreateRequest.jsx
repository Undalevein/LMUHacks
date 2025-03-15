import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './CreateRequest.css';

function CreateRequest() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');


  const categories = [
    { value: 'ride', label: 'I Need a Ride' },
    { value: 'major', label: 'Looking For Specific Major' },
    { value: 'study', label: 'I Want to Study' },
    { value: 'textbook', label: 'Borrow a Textbook or Resource' },
    { value: 'tutor', label: 'I Need a Tutor' }
  ];


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
    <div className="create-request-container">
      
      <h2>Create a New Request</h2>
      
      <form onSubmit={handleSubmit}>
        
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
        />


        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
        />
        
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="">Select Category</option>
          {categories.map(cat => (
            
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>

          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
}

export default CreateRequest;

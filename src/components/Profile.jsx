import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthentication } from '../services/authService';

function Profile() {
  const user = useAuthentication();
  const [bio, setBio] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setBio(userDoc.data().bio || '');
          setContactInfo(userDoc.data().contactInfo || '');
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bio || !contactInfo) {
      alert("Please fill out both bio and contact info.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        bio,
        contactInfo,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself"
          />
        </div>
        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Your contact information"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Profile;

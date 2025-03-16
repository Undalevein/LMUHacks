import React from 'react';
import RequestFeed from './RequestFeed';
import { useAuthentication } from '../services/authService';
import { SignIn, SignOut } from './Auth';
function Home() {
  const user = useAuthentication()

  console.log(user)

  return (
    <div id="Home" style={{ padding: '1rem' }}>
      {!user ? <SignIn /> : <SignOut />}
      <RequestFeed user={user} />
    </div>
  );
}

export default Home;

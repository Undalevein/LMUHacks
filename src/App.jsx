import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabaseClient';
import NavBar from '../components/NavBar';
import Home from './components/Home';
import CreateRequest from './components/CreateRequest';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateRequest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
            />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
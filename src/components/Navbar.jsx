import { Link } from 'react-router-dom'
import { supabase } from "../supabaseClient";


export default function NavBar() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-gray-800 p-4">

      <div className="container mx-auto flex justify-between items-center">

        <div className="flex space-x-4">
          <Link to="/" className>Home</Link>
          <Link to="/create" className>Create Request</Link>
          <Link to="/profile" className>Profile</Link>
        </div>

        <button onClick={handleLogout} className>Logout</button>

      </div>

    </nav>
  )
}
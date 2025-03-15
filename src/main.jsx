import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './App'
import Home from './components/Home'
import Profile from './components/Profile'
import CreateRequest from './components/CreateRequest'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />

      <Route path="profile" element={<Profile />} />
      <Route path="create-request" element={<CreateRequest />} />
    </Route>
  )
)

//https://reactrouter.com/start/declarative/routing
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

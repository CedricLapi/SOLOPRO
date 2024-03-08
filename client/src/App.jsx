import { Route, Routes } from 'react-router-dom'

import './App.css'
import BookForm from './components/BookForm'
import BookClubDashboard from './components/BookClubDashboard'
import RegisterForm from './components/RegisterForm'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'
import AdminDashboard from './components/AdminDashboard'
import ViewerDetails from './components/ViewerDetails'
import Favorite from './components/Favorite'
import CreatorDetails from './components/CreatorDetails'
import MapFunction from './components/MapFunction'

function App() {
  

  return (
    <>
      <h1>The BookClub App</h1>
      <Routes>
      <Route element={<BookForm />} path="/api/books/new" />
      <Route element={<RegisterForm />} path="/api/users/register" />
      <Route element={<BookClubDashboard />} path="/api/books" />
      <Route element={<LoginForm />} path="/" />
      <Route element={<AdminDashboard />} path="/api/users" />
      <Route element={<ViewerDetails />} path="/api/books/:id/details" />
      <Route element={<CreatorDetails />} path="/api/books/:id/details/c" />
      <Route element={<Favorite />} path="/api/books/:id/favorite" />
      <Route element={<MapFunction />} path="/api/books/function" />
      
      <Route element={<NotFound />} path="*" />

      </Routes>
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'

import './App.css'
import BookForm from './components/BookForm'
import BookClubDashboard from './components/BookClubDashboard'
import RegisterForm from './components/RegisterForm'

function App() {
  

  return (
    <>
      <h1>Main App</h1>
      <Routes>
      <Route element={<BookForm />} path="/api/books/new" />
      <Route element={<RegisterForm />} path="/api/users/register" />
      <Route element={<BookClubDashboard />} path="/api/books" />

      </Routes>
    </>
  )
}

export default App

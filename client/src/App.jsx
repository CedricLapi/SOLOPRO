import { Route, Routes } from 'react-router-dom'

import './App.css'
import BookForm from './components/BookForm'
import BookClubDashboard from './components/BookClubDashboard'
import RegisterForm from './components/RegisterForm'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'

function App() {
  

  return (
    <>
      <h1>Main App</h1>
      <Routes>
      <Route element={<BookForm />} path="/api/books/new" />
      <Route element={<RegisterForm />} path="/api/users/register" />
      <Route element={<BookClubDashboard />} path="/api/books" />
      <Route element={<LoginForm />} path="/api/users/login" />
      <Route element={<NotFound />} path="*" />

      </Routes>
    </>
  )
}

export default App

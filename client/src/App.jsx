import { Route, Routes } from 'react-router-dom'

import './App.css'
import BookForm from './components/BookForm'
import BookClubDashboard from './components/BookClubDashboard'

function App() {
  

  return (
    <>
      <h1>Main App</h1>
      <Routes>
      <Route element={<BookForm />} path="/api/books/new" />
      <Route element={<BookClubDashboard />} path="/api/books" />

      </Routes>
    </>
  )
}

export default App

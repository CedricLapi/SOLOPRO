import { Route, Routes } from 'react-router-dom'

import './App.css'
import BookForm from './components/BookForm'

function App() {
  

  return (
    <>
      <h1>Book Club</h1>
      <Routes>
      <Route element={<BookForm />} path="/api/books/new" />

      </Routes>
    </>
  )
}

export default App

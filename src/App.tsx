import './App.css'
import {
  Routes,
  Route,
} from 'react-router-dom';
import { Home, Header, Books, BookDetails } from './features/books'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bookslist' element={<Books />} />
        <Route path="/bookslist/:bookId" element={<BookDetails />} />
      </Routes>
    </>
  )
}

export default App

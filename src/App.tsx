import './App.css'
import {
  Routes,
  Route,
} from 'react-router-dom';
import Home from './features/books/Home';
import Header from './features/books/Header';
import Books from './features/books/Books';
import BookDetails from './features/books/BookDetails';

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

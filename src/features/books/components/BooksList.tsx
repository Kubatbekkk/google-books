import { useSelector } from "react-redux"
import { getBooksList } from "../booksSlice"
import { BookCard } from ".."
import { Col, Container, Row } from "react-bootstrap"

export default function BooksList() {
  const books = useSelector(getBooksList)

  return (
    <Container fluid>
      <Row className="mt-3 justify-content-center" xs='auto' sm='auto' md='auto' lg='auto' xl='auto'>
        {
          books.map(book => <Col key={book.id} className="mb-4"><BookCard books={book} /></Col>)
        }
      </Row>
    </Container>
  )
}

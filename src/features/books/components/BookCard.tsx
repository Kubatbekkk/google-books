import { Card, Row } from "react-bootstrap"
import type { Books } from '../../../types/BookResponse'
import noImage from '../../../assets/no-image.png'
import { Link } from "react-router-dom"

interface CardProps {
  books: Books
}

const BookCard = ({ books }: CardProps) => {
  const { id: bookId, volumeInfo: { title, authors, categories, imageLinks } } = books
  const authorsJoined = authors ? authors.join(', ') : '';
  const category = categories ? categories[0] : ''

  return <Link to={`/bookslist/${bookId}`} >
    <Card bg="light" className="card-on-hover" >
      <Card.Img as='img' variant="top" className="card-img" src={imageLinks?.thumbnail || noImage} height={280} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Row>
          <Card.Title as='h6' className="card-title">{title.slice(0, 50)}</Card.Title>
          <Card.Text className="text-secondary lh-1" >
            <small className="fst-italic">Authors: {authorsJoined.slice(0, 168)}</small>
          </Card.Text>
        </Row>
        <Card.Text as="p" className="fs-6 lh-1">
          <small><span className="text-secondary">Category:</span> {category}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>
}

export default BookCard
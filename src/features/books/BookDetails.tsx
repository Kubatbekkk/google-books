import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { getBooksList } from "./booksSlice"
import { Link } from "react-router-dom"
import noImage from '../../assets/no-image.png'
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useState } from "react"

const BookDetails = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { bookId } = useParams()

  const books = useSelector(getBooksList)
  const selectedBook = books.find(book => book.id === bookId)

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  let content;

  if (!selectedBook) {
    content = <div>Book not found</div>;
  } else {
    const { volumeInfo: { title, authors, description, categories, imageLinks } } = selectedBook
    const truncatedDescription = description?.slice(0, 450);
    const descriptionLength = description ? description.length : 0;

    content = <Container className="my-4" fluid='sm'>
      <Row>
        <Col xs={12} md={5}>
          <div className="img-wrapper mx-auto">
            <img
              src={imageLinks?.thumbnail || noImage}
              alt={title}
              className="img-thumbnail"
            />
          </div>
        </Col>

        <Col className="d-flex flex-column justify-content-end" xs={12} md={7}>
          <Card.Title>{title}</Card.Title>
          <Card.Body>
            <Card.Text className="fst-italic">{categories}</Card.Text>
            <Card.Text>{authors}</Card.Text>
            <Card.Text>
              {showFullDescription ? description : truncatedDescription}
              {descriptionLength > 450 && (
                <button
                  className="btn btn-link text-decoration-none text-success"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? 'Read less' : '...Read more'}
                </button>
              )}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-center mt-3">
            <Button variant="outline-primary" >
              <Link to='/bookslist'>Back</Link>
            </Button>
          </Card.Footer>
        </Col>
      </Row>
    </Container>
  }

  return (
    content
  )
}

export default BookDetails
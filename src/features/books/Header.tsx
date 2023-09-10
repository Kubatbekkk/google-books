import { Link } from 'react-router-dom';

import { Container, Row } from 'react-bootstrap';
import SearchForm from './SearchForm';
const Header = () => {
  return <Container fluid className='header shadow-md mb-3'>
    <Row>
      <Link to={'/'} className='text-decoration-none text-reset'>
        <h1 className='text-center text-body mt-3'>Books</h1>
      </Link>
    </Row>
    <SearchForm />
  </Container>
};

export default Header;

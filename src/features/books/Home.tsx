import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <h3 className='fs-3 text-center text-primary mt-5'>Future Front</h3>
      <p className='fs-4 text-center text-secondary'>
        This service works using the Google Books API. <br />
        The technology stack is React.js, Redux-Toolkit, React-Bootstrap.
      </p>
    </Container>
  );
};

export default Home;

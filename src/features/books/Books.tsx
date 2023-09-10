import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import BooksList from './BooksList';
import { fetchMoreBooks, getBooksList, getBooksStatus, getIsLoadingButton, getSearchParams, getTotalItems } from './booksSlice';
import type { AppDispatch } from '../../app/store';
import { useNavigate } from 'react-router';
import { MAX_RESULTS } from '../../constants/api';

const Books = () => {
  const status = useSelector(getBooksStatus)
  const books = useSelector(getBooksList)
  const isLoadingButton = useSelector(getIsLoadingButton)
  const totalItems = useSelector(getTotalItems)
  const searchParams = useSelector(getSearchParams)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const currentPage = searchParams.page!;
  const nextPage = currentPage + 1;

  const possibleCount = nextPage * MAX_RESULTS;

  useEffect(() => {
    const delay = 2_000
    if (status !== 'isLoading' && books.length === 0) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, delay)
    }
  }, [books, status, navigate]);

  const handleOnClick = () => {
    dispatch(fetchMoreBooks({
      ...searchParams,
      page: nextPage,
    }))
  };

  const spinners = [1, 2, 3, 4]

  return (
    <Container className='mb-5'>
      {status === 'isLoading' ? (
        <Row className="justify-content-center gap-2 mt-5" >
          {spinners.map((_, index) => <Spinner key={index} animation="grow" variant="success" />)}
        </Row>
      ) : (
        <>
          <div className='mt-3 text-center fw-bold'>Found {totalItems} result</div>
          <BooksList />
          <div className='text-center'>
            {totalItems <= possibleCount || (
              <Button
                onClick={handleOnClick}
                disabled={isLoadingButton || totalItems <= possibleCount}
                size='lg'
                className='px-5 mt-3 mb-5 load-more-btn'
                variant='outline-success'
              >
                {isLoadingButton ? <Spinner size='sm' /> : 'Load more...'}
              </Button>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default Books;
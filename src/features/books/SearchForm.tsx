import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CATEGORY_SELECT_OPTIONS, SORT_SELECT_OPTIONS } from '../../constants/form';

import {
  Col,
  Row,
  Form,
  FormControl,
  FormSelect,
  FormGroup,
  FormLabel,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { fetchBooks } from './booksSlice';
import { AppDispatch } from '../../app/store';
import type { FetchBooksArgs } from './booksSlice';

const SerchTermForm = () => {

  const initialValues: FetchBooksArgs = { searchTerm: '', category: '', page: 0, sort: 'Relevance' };

  const [values, setValues] = useState<FetchBooksArgs>(initialValues);
  const [isInvalid, setIsInvalid] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
    setIsInvalid(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.searchTerm === '') {
      setIsInvalid(true);
      return;
    }
    dispatch(fetchBooks(values));

    navigate('/bookslist');
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormGroup className='mt-2'>
        <Row className='justify-content-center '>
          <Col md={4}>
            <InputGroup>
              <FormControl
                isInvalid={isInvalid}
                name='searchTerm'
                value={values.searchTerm}
                onChange={handleOnChange}
                placeholder='Search...'
              />
              <FormControl.Feedback tooltip type='invalid'>
                Please enter a valid book name.
              </FormControl.Feedback>
              <Button
                id='submit-button'
                size='sm'
                variant='success'
                type='submit'
              >
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup className='mt-2 '>
        <Row className='justify-content-center'>
          <Col className='me-2' xs md={2}>
            <FormLabel>Categories:</FormLabel>
            <FormSelect onChange={handleOnChange} value={values.category} name='category' size='sm'>
              {CATEGORY_SELECT_OPTIONS.map(({ name, value }, index) => (
                <option key={index} value={value}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Col>
          <Col className='ms-2' xs md={2}>
            <FormLabel>Sorting By:</FormLabel>
            <FormSelect onChange={handleOnChange} value={values.sort} name='sort' size='sm'>
              {SORT_SELECT_OPTIONS.map(({ name, value }, index) => (
                <option key={index} value={value}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
};

export default SerchTermForm;
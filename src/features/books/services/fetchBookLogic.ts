// bookService.ts
import axios from 'axios';
import { MAX_RESULTS } from '../../../constants/api';

const baseURL = 'https://www.googleapis.com/books/v1/volumes';
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchBooksLogic = async (
  searchTerm: string,
  category: string = '',
  page: number = 0,
  sort: string = 'relevance'
) => {
  const startIndex = MAX_RESULTS * page;

  try {
    const response = await axios.get(
      `${baseURL}?q=${searchTerm}+subject:${category}&maxResults=30&startIndex=${startIndex}&orderBy=${sort}&key=${apiKey}`
    );

    if (response.data && response.data.items) {
      const uniqueItems = response.data.items.filter(
        (item: { id: string }, index: number, self: { id: string }[]) => {
          return index === self.findIndex((t) => t.id === item.id);
        }
      );
      return { ...response.data, items: uniqueItems };
    } else {
      return { ...response.data, items: [] };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { fetchBooksLogic } from './services/fetchBookLogic';

interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Books[];
}

export interface Books {
  id: string;
  volumeInfo: VolumeInfo;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description?: string;
  categories: string[];
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
}

interface BooksState {
  isLoading: 'idle' | 'isLoading' | 'succeeded' | 'failed';
  isLoadingButton: boolean;
  error: undefined | string;
  searchParams: {
    searchTerm: string;
    category: string | undefined;
    page: number | undefined;
    sort: 'Relevance' | 'Newest' | undefined;
  };
  data: BooksResponse;
}

const initialState: BooksState = {
  isLoading: 'idle',
  isLoadingButton: false,
  error: undefined,
  searchParams: {
    searchTerm: '',
    category: '',
    page: 0,
    sort: 'Relevance',
  },
  data: {
    kind: '',
    totalItems: 0,
    items: [],
  },
};

export interface FetchBooksArgs {
  searchTerm: string;
  category?: string;
  page?: number;
  sort?: 'Relevance' | 'Newest';
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (arg: FetchBooksArgs) => {
    const { searchTerm, category, page, sort } = arg;
    return {
      searchParams: { searchTerm, category, page, sort },
      data: await fetchBooksLogic(searchTerm, category, page, sort),
    };
  }
);

export const fetchMoreBooks = createAsyncThunk(
  'books/fetchMoreBooks',
  async (arg: FetchBooksArgs) => {
    const { searchTerm, category, page, sort } = arg;
    return {
      searchParams: { searchTerm, category, page, sort },
      data: await fetchBooksLogic(searchTerm, category, page, sort),
    };
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = 'isLoading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.searchParams = action.payload.searchParams;
        state.data = action.payload.data;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = 'failed';
        console.error({ action: action.error.message });
        state.error = action.error.message;
      })
      //* fetchMoreBooks
      .addCase(fetchMoreBooks.pending, (state) => {
        state.isLoadingButton = true;
      })
      .addCase(fetchMoreBooks.fulfilled, (state, action) => {
        state.searchParams.page = action.payload.searchParams.page;
        state.isLoadingButton = false;
        state.data.items.push(...action.payload.data.items);
      })
      .addCase(fetchMoreBooks.rejected, (state, action) => {
        state.isLoadingButton = true;
        console.log({ action: action.error.message });
        state.error = action.error.message;
      });
  },
});

//! selectors
export const getBooksStatus = (state: RootState) => state.books.isLoading;
export const getBooksError = (state: RootState) => state.books.error;
export const getBooksList = (state: RootState) => state.books.data.items;
export const getIsLoadingButton = (state: RootState) =>
  state.books.isLoadingButton;
export const getTotalItems = (state: RootState) => state.books.data.totalItems;
export const getSearchParams = (state: RootState) => state.books.searchParams;

//! actions

export default booksSlice.reducer;

import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// Custom Axios baseQuery for RTK Query
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Books API using RTK Query
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), 
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params) => ({
        url: '/product/getAllBooks',
        method: 'POST',
        data: params,
      }),
    }),
    // Add more endpoints here if needed, e.g., getBookById, searchBooks
  }),
});

// Export generated hook
export const { useGetAllBooksQuery } = booksApi;

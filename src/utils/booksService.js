import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

/* ------------------ Axios baseQuery ------------------ */
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

/* ------------------ Books API ------------------ */
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['Books'],

  endpoints: (builder) => ({
/*--------------------------------------------------*/

searchBooks: builder.mutation({
  query: (payload) => ({
    url: "/product/getAllBooks",
    method: "POST",
    body: payload,
  }),
}),

    /* ---------------- GET ALL BOOKS ---------------- */
    getAllBooks: builder.query({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/product/getAllBooks',
        method: 'POST',
        data: { page, pageSize },
      }),
      providesTags: ['Books'],
    }),

    /* ---------------- GET BOOK BY ID ---------------- */
    getBookById: builder.query({
      query: (bookId) => ({
        url: `/product/getBookById/${bookId}`,
        method: 'GET',
      }),
    }),

    /* ---------------- SAVE (CREATE) BOOK ---------------- */
    saveBook: builder.mutation({
      query: (body) => ({
        url: '/product/saveBook',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Books'],
    }),

    /* ---------------- UPDATE BOOK (EDIT) ---------------- */
    updateBook: builder.mutation({
      query: ({ id, body }) => ({
        url: '/product/saveBook',
        method: 'POST',
        data: {
          ...body,
          id, // backend uses id to update
        },
      }),
      invalidatesTags: ['Books'],
    }),

    /* ---------------- UPLOAD COVER ---------------- */
    uploadCover: builder.mutation({
      query: ({ bookId, slug, data }) => ({
        url: `/product/books/${bookId}/${slug}/uploadAssets`,
        method: 'POST',
        data,
      }),
    }),

    /* ---------------- UPLOAD CAROUSEL ---------------- */
    uploadCarousel: builder.mutation({
      query: ({ bookId, slug, data }) => ({
        url: `/product/books/${bookId}/${slug}/uploadCarousels`,
        method: 'POST',
        data,
      }),
    }),

    /* ---------------- UPLOAD SECTIONS / CHAPTERS ---------------- */
    uploadAssets: builder.mutation({
      query: ({ bookId, slug, data }) => ({
        url: `/product/books/${bookId}/${slug}/uploadAssets`,
        method: 'POST',
        data,
      }),
    }),

    /* ---------------- DELETE BOOK ---------------- */
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/product/book/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),

  }),
});

/* ------------------ EXPORT HOOKS ------------------ */
export const {
  useSearchBooksMutation,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useSaveBookMutation,
  useUpdateBookMutation,
  useUploadCoverMutation,
  useUploadCarouselMutation,
  useUploadAssetsMutation,
  useDeleteBookMutation,
} = booksApi;

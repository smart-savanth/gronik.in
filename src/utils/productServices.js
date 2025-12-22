import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['Products'],

  endpoints: (builder) => ({

    // ------------------------
    // SAVE BOOK (ADMIN)
    // ------------------------
    saveBook: builder.mutation({
      query: (bookData) => ({
        url: '/product/saveBook',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Products'],
    }),

    // ------------------------
    // GET ALL BOOKS
    // ------------------------
    getAllBooks: builder.query({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/product/getAllBooks',
        method: 'POST',
        body: { page, pageSize },
      }),
      providesTags: ['Products'],
    }),

    // ------------------------
    // GET BOOK BY ID
    // ------------------------
    getBookById: builder.query({
  query: (bookId) => `/product/getBookById/${bookId}`,
  transformResponse: (response) => response?.data || null,
}),

    // ------------------------
    // UPLOAD CHAPTERS / SECTIONS / COVER (ASSETS)
    // ------------------------
    uploadAssets: builder.mutation({
      query: ({ bookId, bookSlug, formData }) => ({
        url: `/product/books/${bookId}/${bookSlug}/uploadAssets`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),

    // ------------------------
    // UPLOAD CAROUSEL IMAGES
    // ------------------------
    uploadCarousels: builder.mutation({
      query: ({ bookId, bookSlug, formData }) => ({
        url: `/product/books/${bookId}/${bookSlug}/uploadCarousels`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),

    // ------------------------
    // UPDATE BOOK WITH CAROUSELS
    // ------------------------
    updateBookWithCarousal: builder.mutation({
      query: (payload) => ({
        url: '/product/book/updateBookWithCarousal',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Products'],
    }),

  }),
});

export const {
  useSaveBookMutation,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useUploadAssetsMutation,
  useUploadCarouselsMutation,
  useUpdateBookWithCarousalMutation,
} = productApi;

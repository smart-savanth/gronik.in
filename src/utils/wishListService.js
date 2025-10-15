import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlistByUserId: builder.query({
      query: (userId) => `/wishlist/getWishlistByUserId/${userId}`,
      providesTags: ['Wishlist'],
      transformResponse: (response) => ({
        ...response,
        data: response.data.map(item => ({
          ...item,
          _id: item.productId, // Map productId to _id for consistency
          productId: item.productId,
          price: item.price || item.final_price,
          originalPrice: item.originalPrice || item.original_price,
          title: item.title || 'Unknown Title',
          author: item.author || 'Unknown Author',
          image: item.image || '/images/placeholder.jpg',
        })),
      }),
    }),
    saveWishlist: builder.mutation({
      query: ({ userId, productId, type }) => ({
        url: '/wishlist/saveWishlist',
        method: 'POST',
        body: {
          user_id: userId,
          product_details: [productId],
          wishList_type: type, 
        },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: ({ userId, itemId }) => ({
        url: `/wishlist/remove/${userId}/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const { useGetWishlistByUserIdQuery, useSaveWishlistMutation, useRemoveFromWishlistMutation } = wishlistApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCartByUserId: builder.query({
      query: (userId) => `/cart/getCartByUserId/${userId}`,
      providesTags: ['Cart'],
      transformResponse: (response) => ({
        ...response,
        data: response.data.map(item => ({
          ...item,
          _id: item.productId, 
          productId: item.productId,
          quantity: item.quantity || 1,
          price: item.price || item.final_price,
          originalPrice: item.originalPrice || item.original_price,
        })),
      }),
    }),
    saveCart: builder.mutation({
      query: ({ userId, productId, type }) => ({
        url: '/cart/saveCart',
        method: 'POST',
        body: {
          user_id: userId,
          product_details: [productId],
          type_of_cart: type,
          quantity: 1, // Default quantity for saveCart
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: ({ userId, productId, quantity }) => ({
        url: '/cart/saveCart',
        method: 'POST',
        body: {
          user_id: userId,
          product_details: [productId],
          type_of_cart: 'save',
          quantity: quantity || 1,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: ({ userId, itemId }) => ({
        url: `/cart/remove/${userId}/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartQuantity: builder.mutation({
      query: ({ userId, itemId, quantity }) => ({
        url: '/cart/updateQuantity',
        method: 'PUT',
        body: { userId, itemId, quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartByUserIdQuery, useSaveCartMutation, useAddToCartMutation, useRemoveFromCartMutation, useUpdateCartQuantityMutation } = cartApi;
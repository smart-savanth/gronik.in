import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCartByUserId: builder.query({
      query: (userId) => `/cart/getCartByUserId/${userId}`,
      providesTags: ['Cart'],
      transformResponse: (response) => {
        // Handle cases where response.data might not exist or not be an array
        if (!response || !response.data || !Array.isArray(response.data)) {
          console.warn('Cart API response missing or invalid data:', response);
          return {
            ...response,
            data: [],
          };
        }

        // API shape: data is an array of cart entries, each with product_details (array)
        const normalized = response.data.flatMap((entry) => {
          const products = Array.isArray(entry.product_details)
            ? entry.product_details
            : entry.product_details
              ? [entry.product_details]
              : [];

          if (products.length === 0) return [];

          return products.map((p) => ({
            ...p,
            product: p, // keep a reference for UI fallbacks
            cartGuid: entry.guid,
            _id: p._id || p.id || entry.productId || entry._id || entry.id,
            productId: p._id || p.id || entry.productId || entry._id || entry.id,
            quantity: p.quantity || entry.quantity || 1,
            price: p.final_price || p.price || entry.price || entry.final_price || 0,
            originalPrice:
              p.original_price ||
              p.mrp ||
              p.price ||
              entry.original_price ||
              entry.originalPrice ||
              0,
          }));
        });

        return {
          ...response,
          data: normalized,
        };
      },
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
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),

  tagTypes: ['Cart'],

  endpoints: (builder) => ({
    // ========================
    // GET CART BY USER ID
    // ========================
    getCartByUserId: builder.query({
      query: (userId) => `/cart/getCartByUserId/${userId}`,

      providesTags: ['Cart'],

      transformResponse: (response) => {
        if (!response?.data || !Array.isArray(response.data)) {
          return [];
        }

        // Flatten product_details[] into cart items
        return response.data.flatMap((entry) => {
          if (!Array.isArray(entry.product_details)) return [];

          return entry.product_details.map((product) => ({
            id: product._id || product.id,
            productId: product._id || product.id,

            title: product.title,
            author: product.author,
            rating: product.rating ?? 4.5,

            image: product.coverImageUrl || null,

            price: product.final_price ?? product.price ?? 0,
            originalPrice:
              product.original_price ??
              product.mrp ??
              product.price ??
              0,

            quantity: product.quantity ?? 1,

            cartGuid: entry.guid,
          }));
        });
      },
    }),

    // ========================
    // ADD TO CART
    // ========================
    addToCart: builder.mutation({
      query: ({ userId, productId, quantity = 1 }) => ({
        url: '/cart/saveCart',
        method: 'POST',
        body: {
          user_id: userId,
          product_details: [productId],
          type_of_cart: 'save',
          quantity,
        },
      }),
      invalidatesTags: ['Cart'],
    }),

    // ========================
    // REMOVE FROM CART
    // ========================
    removeFromCart: builder.mutation({
      query: ({ userId, productId }) => ({
        url: '/cart/saveCart',
        method: 'POST',
        body: {
          user_id: userId,
          product_details: [productId],
          type_of_cart: 'remove',
        },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartByUserIdQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApi;

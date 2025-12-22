import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['Orders'],

  endpoints: (builder) => ({

    // ------------------------
    // SAVE ORDER
    // ------------------------
    saveOrder: builder.mutation({
      query: ({ userId, paymentId, productIds }) => ({
        url: '/order/saveOrder',
        method: 'POST',
        body: {
          user_id: userId,
          payment_id: paymentId,
          product_details: productIds,
        },
      }),
      invalidatesTags: ['Orders'],
    }),

    // ------------------------
    // GET ALL ORDERS (ADMIN)
    // ------------------------
    getAllOrders: builder.query({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/order/getAllOrders',
        method: 'POST',
        body: { page, pageSize },
      }),
      providesTags: ['Orders'],
    }),

    // ------------------------
    // GET ORDER BY ID
    // ------------------------
    getOrderById: builder.query({
      query: (orderId) => `/order/getOrderById/${orderId}`,
    }),

    // ------------------------
    // GET ALL ORDERS BY USER ID
    // ------------------------
    getAllOrdersByUserId: builder.query({
      query: (userId) => `/order/getAllOrdersByUserId/${userId}`,
      providesTags: ['Orders'],
    }),

    // ------------------------
    // GET ORDER ITEMS BY USER
    // ------------------------
    getOrderItemsByUser: builder.query({
      query: (userId) => `/order/getorderItemsByUser/${userId}`,
    }),

  }),
});

export const {
  useSaveOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersByUserIdQuery,
  useGetOrderItemsByUserQuery,
} = orderApi;

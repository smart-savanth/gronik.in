import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

/* ------------------ Axios baseQuery ------------------ */
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      // Log the exact data being sent (before axios serialization)
      if (data && data.amount !== undefined) {
        console.log('Axios baseQuery - data before send:', {
          data,
          amount: data.amount,
          amountType: typeof data.amount,
          stringified: JSON.stringify(data),
          parsed: JSON.parse(JSON.stringify(data))
        });
      }
      
      // For POST requests with data, explicitly stringify to ensure number types are preserved
      let requestData = data;
      if (method === 'POST' && data && typeof data === 'object') {
        // Stringify and parse to ensure proper JSON serialization
        requestData = JSON.parse(JSON.stringify(data));
      }
      
      const result = await axios({
        url: baseUrl + url,
        method,
        data: requestData,
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      console.error('Axios error:', {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        requestData: axiosError.config?.data
      });
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export const paymentApi = createApi({
  reducerPath: 'paymentApi',

  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),

  tagTypes: ['Payments'],

  endpoints: (builder) => ({

    /* --------------------------------
     * SAVE PAYMENT
     * -------------------------------- */
   savePayment: builder.mutation({
  query: ({ userId, amount, productId }) => {
    const finalAmount = Math.round(Number(amount) * 100);

    const payload = {
      user_id: userId,
      amount: finalAmount,
      product_details: Array.isArray(productId)
        ? productId
        : [productId],
    };

    console.log("✅ FINAL PAYMENT PAYLOAD:", payload);

    return {
      url: '/payment/savePayment',
      method: 'POST',
      data: payload, // ✅ MUST be `data`
    };
  },
  invalidatesTags: ['Payments'],
}),

    /* --------------------------------
     * GET ALL TRANSACTIONS (ADMIN)
     * -------------------------------- */
    getAllTransactions: builder.query({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: '/payment/getAllTransactions',
        method: 'POST',
        data: { page, pageSize },
      }),
      providesTags: ['Payments'],
    }),

    /* --------------------------------
     * GET TRANSACTION BY ID
     * -------------------------------- */
    getTransactionById: builder.query({
      query: (transactionId) => ({
        url: `/payment/getTransactionById/${transactionId}`,
        method: 'GET',
      }),
    }),

    /* --------------------------------
     * GET TRANSACTIONS BY USER ID
     * -------------------------------- */
    getTransactionByUserId: builder.query({
      query: (userId) => ({
        url: `/payment/getTransactionByUserId/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Payments'],
    }),

  }),
});

/* --------------------------------
 * EXPORT HOOKS
 * -------------------------------- */
export const {
  useSavePaymentMutation,
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetTransactionByUserIdQuery,
} = paymentApi;

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
        // Ensure amount is a number, not a string
        // Use parseFloat to handle decimals properly
        let numericAmount;
        if (typeof amount === 'string') {
          numericAmount = parseFloat(amount);
        } else if (typeof amount === 'number') {
          numericAmount = amount;
        } else {
          numericAmount = parseFloat(String(amount));
        }
        
        // Validate it's a valid number
        if (isNaN(numericAmount) || !isFinite(numericAmount)) {
          throw new Error('Invalid amount value');
        }
        
        // Ensure it's definitely a number primitive
        // Create a fresh number from the numeric value to avoid any type issues
        let finalAmount = typeof numericAmount === 'number' 
          ? numericAmount 
          : parseFloat(String(numericAmount));
        
        // Validate it's a valid number
        if (isNaN(finalAmount) || !isFinite(finalAmount)) {
          throw new Error('Invalid amount value after conversion');
        }
        
        // Backend might expect amount in paise (smallest currency unit)
        // Convert rupees to paise: multiply by 100 and round to integer
        // This ensures we send an integer value that the backend can parse
        finalAmount = Math.round(finalAmount * 100);
        
        // Ensure it's an integer (not a float)
        if (!Number.isInteger(finalAmount)) {
          finalAmount = Math.round(finalAmount);
        }
        
        // product_details should be a string (single product ID), not an array
        const productDetailsString = typeof productId === 'string' 
          ? productId 
          : (Array.isArray(productId) ? productId[0] : String(productId));
        
        // Create the payload - ensure amount is an integer
        const payload = {
          user_id: userId,
          amount: finalAmount, // Integer (in paise)
          product_details: productDetailsString,
        };
        
        // Double-check the type before sending - should be a number (integer)
        if (typeof payload.amount !== 'number' || !Number.isInteger(payload.amount)) {
          console.error('CRITICAL: Amount is not an integer!', {
            original: amount,
            numericAmount,
            finalAmount,
            type: typeof payload.amount,
            isInteger: Number.isInteger(payload.amount),
            payload
          });
          throw new Error(`Amount type error: expected integer, got ${typeof payload.amount}`);
        }
        
        // Log the exact payload that will be sent
        const payloadString = JSON.stringify(payload);
        console.log('Payment service - final payload:', {
          originalAmount: amount,
          convertedToPaise: finalAmount,
          payload,
          payloadString,
          amountType: typeof payload.amount,
          amountValue: payload.amount,
          parsedBack: JSON.parse(payloadString).amount,
          parsedBackType: typeof JSON.parse(payloadString).amount
        });
        
        return {
          url: '/payment/savePayment',
          method: 'POST',
          data: payload,
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

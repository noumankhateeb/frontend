// redux/slices/auth/authAction.tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAction = createApi({
    reducerPath: 'authAction',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/user' }), // Base URL for the backend
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signupUser: builder.mutation({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useSignupUserMutation } = authAction;

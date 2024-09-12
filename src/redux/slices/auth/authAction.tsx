import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAction = createApi({
    reducerPath: 'authAction',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/user' }),
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

        updateUserProfile: builder.mutation({
            query: ({ token, profileData }) => ({
                url: '/edit',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: profileData,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useSignupUserMutation, useUpdateUserProfileMutation } = authAction;

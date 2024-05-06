import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const usersApi = createApi({
  reducersPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todogpt-backend.vercel.app/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users?email=${email}`,
    }),
    getUserById: builder.query({
      query: (_id) => `/users/${_id}`,
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserByEmailQuery,
  useGetUserByEmailId,
  useAddUserMutation,
  useRegisterUserMutation,
} = usersApi;

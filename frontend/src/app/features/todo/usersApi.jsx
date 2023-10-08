import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const usersApi = createApi({
  reducersPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users?email=${email}`,
      debounce: 3000,
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      debounce: 3000,
    }),
  }),
});

export const { useGetUserByEmailQuery, useAddUserMutation } = usersApi;

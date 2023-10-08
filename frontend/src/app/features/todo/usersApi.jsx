import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const usersApi = createApi({
  reducersPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getUserByEmail: builder.query({
      query: (email) => `/users?email=${email}`,
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserByEmailQuery, useAddUserMutation } = usersApi;

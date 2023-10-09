import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getTodosByUser: builder.query({
      query: (userEmail) => `todos?userEmail=${userEmail}`,
    }),
    getTodosByTitle: builder.query({
      query: ({ userEmail, title }) =>
        `todos?userEmail=${userEmail}&title=${title}`,
    }),
    getTodoById: builder.query({
      query: (userId) => `todos?userId=${userId}`,
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "todos",
        method: "POST",
        body: data,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `todos/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (_id) => ({
        url: `todos/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosByUserQuery,
  useGetTodosByTitleQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;

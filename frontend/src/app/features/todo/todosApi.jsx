import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos",
    }),
    getTodoById: builder.query({
      query: (_id) => `todos/${_id}`,
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
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;

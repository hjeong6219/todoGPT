import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodosByUser: builder.query({
      query: (userEmail) => `todos?userEmail=${userEmail}`,
      providesTags: ["Todo"],
    }),
    getTodosByTitle: builder.query({
      query: ({ userEmail, title }) =>
        `todos?userEmail=${userEmail}&title=${title}`,
      providesTags: ["Todo"],
    }),
    getTodosByUserId: builder.query({
      query: ({ userId, page, sort, order }) => {
        const queryParams = new URLSearchParams({ userId, page, sort, order });
        return `todos?${queryParams.toString()}`;
      },
      providesTags: ["Todo"],
    }),
    getTodosById: builder.query({
      query: (_id) => `todos/${_id}`,
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `todos/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (_id) => ({
        url: `todos/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosByUserQuery,
  useGetTodosByUserIdQuery,
  useGetTodosByIdQuery,
  useGetTodosByTitleQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;

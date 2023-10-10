import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getChatByTodo: builder.query({
      query: (todoId) => `chats?todoId=${todoId}`,
    }),
    addChat: builder.mutation({
      query: (data) => ({
        url: "chats",
        method: "POST",
        body: data,
      }),
    }),
    updateChat: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `chats/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteChat: builder.mutation({
      query: (_id) => ({
        url: `chats/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetChatByTodoQuery,
  useAddChatMutation,
  useUpdateChatMutation,
  useDeleteChatMutation,
} = chatApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getChatByTodo: builder.query({
      query: (todoId) => `chats?todoId=${todoId}`,
      providesTags: ["Chat"],
    }),
    addChat: builder.mutation({
      query: (data) => ({
        url: "chats",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    updateChatWithAi: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `chats/${_id}/openai`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    updateChat: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `chats/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (_id) => ({
        url: `chats/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatByTodoQuery,
  useAddChatMutation,
  useUpdateChatMutation,
  useUpdateChatWithAiMutation,
  useDeleteChatMutation,
} = chatApi;

import { createApi } from "@reduxjs/toolkit/query";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getChatByTodo: builder.query({
      query: (todoId) => `chat?todoId=${todoId}`,
    }),
    addChat: builder.mutation({
      query: (data) => ({
        url: "chat",
        method: "POST",
        body: data,
      }),
    }),
    updateChat: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `chat/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteChat: builder.mutation({
      query: (_id) => ({
        url: `chat/${_id}`,
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

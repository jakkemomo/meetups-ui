import { baseApi } from '@/shared/api';
import { ChatDetails, ChatId, ChatMessage, MessageCreate } from '../model/types';
import { ProfileId } from '@/entities/profile/model/types';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    chatList: build.query<ChatDetails[], void>({
      query: () => ({
        url: '/chats/',
      }),
      providesTags: ['CHAT_TAG'],
    }),
    getOrCreateUserDirectChat: build.mutation<ChatDetails, ProfileId>({
      query: ({ userId }) => ({
        url: `/chats/users/${userId}/direct/`,
        method: 'POST',
      }),
    }),
    chatDetails: build.query<ChatDetails, ChatId>({
      query: ({ chat_id }) => ({
        url: `/chats/${chat_id}/`,
      }),
      providesTags: (result, error, { chat_id }) => [{ type: 'CHAT_TAG', id: chat_id }],
    }),
    chatMessages: build.query<ChatMessage[], ChatId>({
      query: ({ chat_id }) => ({
        url: `/chats/${chat_id}/messages/`,
      }),
      providesTags: (result, error, { chat_id }) => [{ type: 'CHAT_TAG', id: chat_id }],
    }),
    chatParticipants: build.query<ProfileId[], ChatId>({
      query: ({ chat_id }) => ({
        url: `/chats/${chat_id}/participants/`,
      }),
      providesTags: (result, error, { chat_id }) => [{ type: 'CHAT_TAG', id: chat_id }],
    }),
    sendMessage: build.mutation<void, MessageCreate>({
      query: ({ chat_id, message_text }) => ({
        url: `/chats/${chat_id}/send_message/`,
        method: 'POST',
        body: message_text,
      }),
      invalidatesTags: (result, error, { chat_id }) => [{ type: 'CHAT_TAG', id: chat_id }],
    }),
  }),
});

export const {
  useChatListQuery,
  useGetOrCreateUserDirectChatMutation,
  useChatDetailsQuery,
  useChatMessagesQuery,
  useChatParticipantsQuery,
  useSendMessageMutation,
} = chatApi;
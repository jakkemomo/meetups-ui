import { baseApi } from '@/shared/api';
import { 
  IAllChatRequest, IChatDetails, IChatId, IChatMessage, IChatRequest, 
  IMessageCreate, IParticipant 
} from '../model/types';
import { ProfileId } from '@/entities/profile/model/types';
import { IApiResponse } from '@/shared/types';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    chatList: build.query<IApiResponse<IChatDetails[]>, void>({
      query: () => '/chats/',
      providesTags: ['CHAT_TAG', 'MESSAGES_TAG'],
    }),
    allChatList: build.query<IApiResponse<IChatDetails[]>, IAllChatRequest>({
      query: ({ search }) => ({
        url: '/chats/all/messages/',
        params: { search }
      }),
    }),
    getOrCreateUserDirectChat: build.mutation<IChatDetails, ProfileId>({
      query: ({ userId }) => ({
        url: `/chats/users/${userId}/direct/`,
        method: 'POST',
      }),
    }),
    chatDetails: build.query<IApiResponse<IChatDetails>, IChatId>({
      query: ({ chat_id }) => `/chats/${chat_id}/`,
      providesTags: (result, error, { chat_id }) => [{ type: 'CHAT_TAG', id: chat_id }],
    }),
    chatMessages: build.query<IApiResponse<IChatMessage[]>, IChatRequest>({
      query: ({ chat_id, search, offset, limit }) => ({
        url: `/chats/${chat_id}/messages/`,
        params: { search, offset, limit }
      }),
      providesTags: (result, error, { chat_id }) => [{ type: 'MESSAGES_TAG', id: chat_id }],
    }),
    chatParticipants: build.query<IApiResponse<IParticipant[]>, IChatId>({
      query: ({ chat_id }) => `/chats/${chat_id}/participants/`,
      providesTags: (result, error, { chat_id }) => [{ type: 'CHAT_PARTICIPANTS_TAG', id: chat_id }],
    }),
    sendMessage: build.mutation<void, IMessageCreate>({
      query: ({ chat_id, message_text }) => ({
        url: `/chats/${chat_id}/send_message/`,
        method: 'POST',
        body: { message_text },
      }),
      invalidatesTags: (result, error, { chat_id }) => [
        { type: 'CHAT_TAG' },
        { type: 'MESSAGES_TAG', id: chat_id },
      ],
    }),
    messageList: build.query<IApiResponse<IChatMessage[]>, void>({
      query: () => '/messages/',
      providesTags: ['MESSAGES_TAG'],
    }),
    markMessagesAsRead: build.mutation<void, { ids: number[] }>({
      query: ({ ids }) => ({
        url: `/messages/mark_as_read/`,
        method: 'PATCH',
        body: { ids },
      }),
      invalidatesTags: ['MESSAGES_TAG'],
    }),
    messageDetails: build.query<IChatMessage, { message_id: number }>({
      query: ({ message_id }) => `/messages/${message_id}/`,
      providesTags: (result, error, { message_id }) => [{ type: 'MESSAGES_TAG', id: message_id }],
    }),
    updateMessage: build.mutation<IChatMessage, { message_id: number; message_text: string; chat_id: number }>({
      query: ({ message_id, message_text }) => ({
        url: `/messages/${message_id}/`,
        method: 'PATCH',
        body: { message_text },
      }),
      invalidatesTags: (result, error, { message_id, chat_id }) => [
        { type: 'MESSAGES_TAG', id: chat_id },
        { type: 'MESSAGES_TAG', id: message_id },
        { type: 'CHAT_TAG'},
      ],
    }),
    deleteMessage: build.mutation<void, { message_ids: number[]; chat_id: number }>({
      query: ({ message_ids }) => ({
        url: `/messages/delete/`,
        method: 'DELETE',
        body: { ids: message_ids },
      }),
      invalidatesTags: (result, error, { chat_id }) => [
        { type: 'MESSAGES_TAG', id: chat_id },
        { type: 'MESSAGES_TAG' },
        { type: 'CHAT_TAG' },
      ],
    }),
  }),
});

export const {
  useChatListQuery,
  useAllChatListQuery,
  useGetOrCreateUserDirectChatMutation,
  useChatDetailsQuery,
  useChatMessagesQuery,
  useChatParticipantsQuery,
  useSendMessageMutation,
  useMessageListQuery,
  useMarkMessagesAsReadMutation,
  useMessageDetailsQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = chatApi;

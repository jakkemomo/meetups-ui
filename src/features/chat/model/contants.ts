import { IRoomInfo } from "./types";
import { ChatDetails, ChatType } from "@/entities/chat/model/types";

// mock
export const roomInfo: IRoomInfo = {
  "chat_id": 1,
  "type": "chat",
  "participants": [
    {
      "user_id": 1,
      "username": "test_user Ivan Butorin",
      "image_url": "www.example.com"
    },
    {
      "user_id": 2,
      "username": "test_user_2",
      "image_url": "www.example.com"
    }
  ],
  "messages": [
    {
      "id": 1,
      "created_by": 1,
      "chat": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 2,
      "created_by": 2,
      "chat": 1,
      "message_text": "U too!!",
      "created_at": "2024-04-25T17:57:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 1,
      "created_by": 1,
      "chat": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 2,
      "created_by": 2,
      "chat": 1,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 1,
      "created_by": 1,
      "chat": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 2,
      "created_by": 2,
      "chat": 1,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 1,
      "created_by": 1,
      "chat": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 2,
      "created_by": 2,
      "chat": 1,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 1,
      "created_by": 1,
      "chat": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 2,
      "created_by": 2,
      "chat": 1,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 1,
      "created_by": 1,
      "chat": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-25T17:52:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 2,
      "created_by": 2,
      "chat": 1,
      "message_text": "U too!!",
      "created_at": "2024-04-24T17:57:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 1,
      "created_by": 1,
      "chat": 1,
      "message_text": "Hello!",
      "created_at": "2024-04-24T17:52:01Z",
      "image_url": "www.example.com"
    },
    {
      "id": 2,
      "created_by": 2,
      "chat": 1,
      "message_text": "U too!!",
      "created_at": "2024-04-25T17:57:01Z",
      "image_url": "www.example.com"
    },
  ]
}

// mock-data
export const rooms: ChatDetails[] = [
  {
    id: 1,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин Владимирович',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела? Пойдешь в следующую пятницу на концерт Моргенштерна?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  },
  {
    id: 2,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  },
  {
    id: 3,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  },
  {
    id: 4,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  },
  {
    id: 5,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  },
  {
    id: 6,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  },
  {
    id: 7,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  },
  {
    id: 8,
    image_url: 'https://storage.googleapis.com/meetups-dev/media/images/44474d3495df4c99975f7a3ad6f5d9a0.webp',
    name: 'Иван Буторин',
    type: ChatType.DIRECT,
    last_message_text: 'Привет, как дела?',
    last_message_is_owner: false
    // lastMessageDate: '1 марта',
    // messagesQuant: 1
  }
]

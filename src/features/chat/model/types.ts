export interface IUser {
  user_id: number;
  username: string;
  image_url: string;
}

export interface IMessage {
  id: number;
  created_by: number;
  chat: number;
  message_text: string;
  created_at: string;
  image_url: string
}

export interface IRoomInfo {
  chat_id: number;
  type: string;
  participants: IUser[];
  messages: IMessage[];
}

export enum ChatsStateType {
	empty = 'empty',
	error = 'error',
}

export interface IChatsStateProps  {
	type: `${ChatsStateType}`;
}


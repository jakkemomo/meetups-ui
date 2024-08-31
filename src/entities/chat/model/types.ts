export enum ChatType {
    'EVENT' = 'EVENT',
    'DIRECT' = 'DIRECT'
}

export interface IChatId {
    chat_id: string
}

export interface IChatDetails {
    id: number, 
    name: string,
    image_url: string,
    type: ChatType,
    last_message_text: string,
    last_message_is_owner: boolean,
    last_message_created_at: string,
    unread_message_counter: number
}

export interface IChatRetrieve {
    id: number, 
    name: string,
    image_url: string,
    type: ChatType,
}

export interface IChatMessage {
    id: number,
    created_by: number,
    chat: number, 
    message_text: string,
    created_at: string,
    image_url: string,
    read_at: string
}

export interface IParticipant {
    id: number,
    username: string,
    image_url: string
}


export interface IMessageCreate {
    message_text: string,
    chat_id: string
}

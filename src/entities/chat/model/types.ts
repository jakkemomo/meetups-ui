enum ChatType {
    'EVENT' = 'EVENT',
    'DIRECT' = 'DIRECT'
}

export interface ChatId {
    chat_id: string
}


export interface ChatDetails {
    id: number, 
    name: string,
    image_url: string,
    type: ChatType,
    last_message_text: string,
    last_message_is_owner: boolean
}

export interface ChatRetrieve {
    id: number, 
    name: string,
    image_url: string,
    type: ChatType,
}

export interface ChatMessage {
    id: number,
    created_by: number,
    chat: number, 
    message_text: string,
    created_at: Date,
    image_url: string
}

export interface Participant {
    id: number,
    username: string,
    image_url: string
}


export interface MessageCreate {
    message_text: string,
    chat_id: string
}
export interface IParticipant {
  id: number,
  username: string,
  image_url: string,
  bio?: string
}

export interface IKickParticipantRequest {
  event_id: number;
  user_id: number;
}

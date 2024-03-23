interface IEventTag {
  id: number,
  name: string
}

export interface IEvent {
  id: number,
  name: string,
  rating: string | null,
  image_url: string,
  description: string,
  start_date: string,
  end_date: string | null,
  tags: IEventTag[] | [],
  address: string,
  category: IEventTag | null,
  participants_number: number,
  desired_participants_number: number
}

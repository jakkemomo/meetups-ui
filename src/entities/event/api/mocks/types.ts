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
  end_date: string,
  tags: IEventTag[] | [],
  address: string,
  category: number | null,
  participants_number: number,
}

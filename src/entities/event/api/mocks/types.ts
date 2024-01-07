type TEventTag = {
  id: number,
  name: string
}

export type TEvent = {
  id: number,
  name: string,
  rating: string | null,
  image_url: string,
  description: string,
  start_date: string,
  end_date: string,
  tags: TEventTag[] | [],
  address: string,
  category: number | null,
  participants_number: number,
}

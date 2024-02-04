export type ProfileDto = {
  id: number
  username: string
  first_name?: string
  last_name?: string
}

export type ProfileDetailsDto = ProfileDto & {
  email: string
  image_url: string,
  is_email_verified: boolean,
}

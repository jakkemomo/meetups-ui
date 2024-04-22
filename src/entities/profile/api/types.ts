interface IUserFavorite {
  id: number,
  name: string
}

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
  city: string,
  is_private: boolean,
  bio: string,
  age: number,
  date_of_birth: string,
  category_favorite: IUserFavorite[] | []
}
  
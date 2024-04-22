/**
 * ✅ DX Best Practice
 * Use branded type to entity id to
 * don't to be confused with other identifiers
 */
interface IUserFavorite {
  id: number,
  name: string
}
export type ProfileId = Brand<Id, 'ProfileId'>

export type ProfileDetails = {
  id: ProfileId
  username: string
  email: string
  firstName?: string
  lastName?: string
  image: Url,
  isEmailVerified: boolean,
  city: string,
  is_private: boolean,
  bio: string,
  age: number,
  date_of_birth: string,
  category_favorite: IUserFavorite[] | []
}

export interface ProfileId {
  userId: string;
}

export interface ProfileDetails {
  id: number
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
  category_favorite: IUserFavorite[] | [],
  gender: string,
}

export interface IUserFavorite {
  id: number,
  name: string,
  image_url: string,
}

export interface ProfileDto {
  id: number
  username: string
  first_name?: string
  last_name?: string
}

export interface ProfileDetailsDto extends ProfileDto {
  email: string
  image_url: string,
  is_email_verified: boolean,
  city: string,
  is_private: boolean,
  bio: string,
  age: number,
  date_of_birth: string,
  category_favorite: IUserFavorite[] | [],
  gender: string,
}

export type IFollowStatus = 'ACCEPTED' | 'PENDING' | 'DECLINED' | undefined;

export interface ProfileFollowing {
  id: number;
  user: number;
  follower: number;
  status: IFollowStatus;
}

export interface IFollowResponse {
  id: number;
  user: number;
  follower: number;
  status: IFollowStatus;
}

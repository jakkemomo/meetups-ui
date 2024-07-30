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
  user: number;
  follower: number;
  username: string;
  status: IFollowStatus;
  image_url: string
}

export interface IFollowResponse {
  user: number;
  follower: number;
  username: string;
  status: IFollowStatus;
  image_url: string
}

export interface IFollowRequest {
  search?: string;
  ordering?: 'start_date' | 'average_rating' | 'participants_number' | '-start_date' | '-average_rating' | '-participants_number';
  username?: string;
  username_contains?: string;
  date_of_birth?: string;
  date_of_birth__gte?: string;
  date_of_birth__lte?: string;
  city?: string;
  city_in?: string;
  gender?: string;
  type?: string;
  type_contains?: string;
  limit?: number;
  offset?: number;
  userId: string
}

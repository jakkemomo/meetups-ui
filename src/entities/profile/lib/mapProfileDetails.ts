import {ProfileDetailsDto, type ProfileDetails} from '../model/types'

export function mapProfileDetails(dto: ProfileDetailsDto): ProfileDetails {
  return {
    id: dto.id,
    username: dto.username,
    email: dto.email,
    firstName: dto.first_name,
    lastName: dto.last_name,
    image: dto.image_url,
    isEmailVerified: dto.is_email_verified,
    city: dto.city,
    is_private: dto.is_private,
    bio: dto.bio,
    age: dto.age,
    date_of_birth: dto.date_of_birth,
    category_favorite: dto.category_favorite,
    gender: dto.gender
  }
}

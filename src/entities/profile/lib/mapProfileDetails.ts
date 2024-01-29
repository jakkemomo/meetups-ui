import { type ProfileDetailsDto } from '../api/types'
import { type ProfileDetails, type ProfileId } from '../model/types'

export function mapProfileDetails(dto: ProfileDetailsDto): ProfileDetails {
    return {
        id: dto.id as ProfileId,
        username: dto.username,
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
        image: dto.image_url,
        isEmailVerified: dto.is_email_verified,
    }
}

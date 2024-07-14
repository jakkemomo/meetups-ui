import { EditProfileValidationSchema } from "./editProfileFormSchema";
import { ProfileDetails } from "@/entities/profile/model/types";

export const removeProfileExtraFields = (
  profileData: ProfileDetails
): EditProfileValidationSchema => {
  return {
    username: profileData.username,
    gender: profileData.gender,
    date_of_birth: profileData.date_of_birth,
    city: profileData.city,
    bio: profileData.bio,
    is_private: profileData.is_private,
    category_favorite: profileData.category_favorite,
  };
};

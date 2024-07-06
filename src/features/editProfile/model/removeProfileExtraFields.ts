import { EditProfileValidationSchema } from "./editProfileFormSchema";
import { ProfileDetails } from "@/entities/profile/model/types";

export const removeProfileExtraFields = async (
  profileData: ProfileDetails
): Promise<EditProfileValidationSchema | undefined> => {
  if (!profileData?.city_location?.place_id) {
    return {
      username: profileData.username,
      gender: profileData.gender,
      city: '',
      date_of_birth: profileData.date_of_birth,
      city_location: {
        location: { longitude: '', latitude: '' },
        north_east_point: { longitude: '', latitude: '' },
        south_west_point: { longitude: '', latitude: '' },
        place_id: ''
      },
      bio: profileData.bio,
      is_private: profileData.is_private,
      category_favorite: profileData.category_favorite,
    };
  }

  const geocoder = new google.maps.Geocoder();

  try {
    const geocodeRes = await geocoder.geocode({ placeId: profileData.city_location.place_id });

    return {
      username: profileData.username,
      gender: profileData.gender,
      city: geocodeRes.results[0].formatted_address,
      date_of_birth: profileData.date_of_birth,
      city_location: {
        location: { longitude: '', latitude: '' },
        north_east_point: { longitude: '', latitude: '' },
        south_west_point: { longitude: '', latitude: '' },
        place_id: ''
      },
      bio: profileData.bio,
      is_private: profileData.is_private,
      category_favorite: profileData.category_favorite,
    };
  } catch (err) {
    throw new Error(`Ошибка при геокодировании - ${JSON.stringify(err)}`);
  }
};

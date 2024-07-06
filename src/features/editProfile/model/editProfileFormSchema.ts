import { z } from "zod";
import { inputExistErrorMessage, inputMaxSize } from "./constants";

export const editProfileFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: inputExistErrorMessage })
    .max(30, { message: inputMaxSize(30) })
    .nullable(),
  image_url: z.string().optional(),
  city: z
    .string()
    .min(1, { message: inputExistErrorMessage }),
  city_location: z
    .object({
      place_id: z.string(),
      location: z
        .object({
          latitude: z.string(),
          longitude: z.string()
        }),
      south_west_point: z
        .object({
          latitude: z.string(),
          longitude: z.string()
        }),
      north_east_point: z
        .object({
          latitude: z.string(),
          longitude: z.string()
        }),
    }),
  gender: z.string().optional(),
  is_private: z.boolean({
    required_error: inputExistErrorMessage,
    invalid_type_error: inputExistErrorMessage,
  }),
  bio: z
    .string()
    .min(1, { message: inputExistErrorMessage })
    .max(410, { message: inputMaxSize(410) }),
  category_favorite: z
    .object({ id: z.number(), name: z.string(), image_url: z.string() })
    .array(),
  date_of_birth: z.string(),
});

export type EditProfileValidationSchema = z.infer<typeof editProfileFormSchema>;

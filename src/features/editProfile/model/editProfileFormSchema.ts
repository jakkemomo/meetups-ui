import { z } from "zod";
import { inputExistErrorMessage, inputMaxSize } from "./constants";

export const editProfileFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: inputExistErrorMessage })
    .max(30, { message: inputMaxSize(30) })
    .nullable(),
  image_url: z.string().optional(),
  city: z.object({
    id: z.number(),
    name: z.string({ required_error: inputExistErrorMessage }),
    display_name: z.string(),
    country_id: z.number(),
    latitude: z.string(),
    longitude: z.string(),
    timezone: z.string()
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

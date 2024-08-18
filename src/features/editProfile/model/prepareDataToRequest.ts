import { EditProfileValidationSchema } from "./editProfileFormSchema";

interface IPrepareDataToRequestProps {
  data: EditProfileValidationSchema;
  dirtyFields: Record<string, boolean | undefined>;
}

export const prepareDataToRequest = ({ data, dirtyFields }: IPrepareDataToRequestProps): Partial<EditProfileValidationSchema> => {
  const filteredData: Record<string, unknown> = {};

  for (const key in dirtyFields) {
    if (dirtyFields[key]) {
      filteredData[key as keyof EditProfileValidationSchema] = data[key as keyof EditProfileValidationSchema];
    }
  }

  return filteredData;
}

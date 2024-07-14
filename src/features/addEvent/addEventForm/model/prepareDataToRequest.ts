import { AddEventValidationSchema } from "./addEventFormSchema";

interface IPrepareDataToRequestProps {
  data: AddEventValidationSchema;
  toEdit: boolean;
  dirtyFields: Record<string, boolean | undefined>;
}

export const prepareDataToRequest = ({ data, toEdit, dirtyFields }: IPrepareDataToRequestProps): Partial<AddEventValidationSchema> => {
  const dataToCreateEvent: Partial<AddEventValidationSchema> = data;

  if (!dataToCreateEvent.repeatable) {
    dataToCreateEvent.schedule = null;
  }

  if (dataToCreateEvent.any_participant_number) {
    dataToCreateEvent.desired_participants_number = null;
  }

  if (dataToCreateEvent.free) {
    dataToCreateEvent.cost = null;
    dataToCreateEvent.currency = null;
  }

  if (!dataToCreateEvent.end_date) {
    dataToCreateEvent.end_date = null;
  }

  if (!dataToCreateEvent.end_time) {
    dataToCreateEvent.end_time = null;
  }

  if (dataToCreateEvent.repeatable) {
    dataToCreateEvent.start_date = null;
    dataToCreateEvent.start_time = null;
    dataToCreateEvent.end_date = null;
    dataToCreateEvent.end_time = null;
  }

  if (toEdit) {
    const filteredData: Record<string, unknown> = {};

    for (const key in dirtyFields) {
      if (dirtyFields[key]) {
        filteredData[key as keyof AddEventValidationSchema] = dataToCreateEvent[key as keyof AddEventValidationSchema];
      }
    }

    return filteredData;
  }

  return dataToCreateEvent;
}

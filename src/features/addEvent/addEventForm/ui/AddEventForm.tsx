import {ReactElement, ReactNode} from "react";
import { AddEventValidationSchema } from "../model/addEventFormSchema";
import { FieldError, useFormContext } from "react-hook-form";
import { useCreateEventMutation, useEditEventMutation } from "@/entities/event/api/eventApi";
import { prepareDataToRequest } from "../model/prepareDataToRequest";
import { useNavigate, useParams } from "react-router-dom";
import { Button, InputErrorMessage } from "@/shared";
import FormLoader from "./FormLoader";

interface IAddEventFormProps {
  children: ReactNode;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  type: 'edit' | 'add';
}

export function AddEventForm({ children, isLoading, isSuccess, isError, type }: IAddEventFormProps): ReactElement {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const {
    handleSubmit,
    formState: { isSubmitted, isValid, dirtyFields }
  } = useFormContext<AddEventValidationSchema>();

  const [createEvent, { isLoading: isCreateEventLoading }] = useCreateEventMutation();
  const [editEvent, { isLoading: isEditEventLoading }] = useEditEventMutation();

  const onSubmit = (data: AddEventValidationSchema) => {
    if (type === 'edit' && eventId) {
      if (Object.keys(dirtyFields).length === 0) {
        navigate(`/events/${eventId}`)
      } else {
        const dataToCreateEvent = prepareDataToRequest({ data, toEdit: true, dirtyFields: dirtyFields as Record<string, boolean | undefined> });

        editEvent({ eventId: Number(eventId), eventInfo: dataToCreateEvent })
          .unwrap()
          .then(() => navigate(`/events/${eventId}`))
          .catch((err) => console.log(err));
      }
    } else {
      const dataToCreateEvent = prepareDataToRequest({ data, toEdit: false, dirtyFields: dirtyFields as Record<string, boolean | undefined> });

      createEvent(dataToCreateEvent)
        .unwrap()
        .then(() => navigate('/'))
        .catch((err) => console.log(err));
    }
  };

  if (isError) return (
    <p>Ошибка на сервере. Попробуйте перезагрузить страницу</p>
  )

  if (isLoading) return (
    <FormLoader />
  )

  if (isSuccess) {
    return (
      <form onSubmit={(data) => void handleSubmit(onSubmit)(data)} noValidate className="flex flex-col scrollbar">
        {children}
        <Button
          type="submit"
          size="lg"
          importance="primary"
          extraClass="self-start mt-10 mb-3"
          disabled={isCreateEventLoading || isEditEventLoading}
        >{type === 'edit' ? "Сохранить" : "Создать"}</Button>
        {!isValid && isSubmitted && <InputErrorMessage error={{message: 'Убедитесь, что все поля заполнены'} as FieldError} />}
      </form>
    )
  }

  return <p>Ошибка на сервере. Попробуйте перезагрузить страницу</p>
}

import { LabeledInput, SelectInput } from "@/shared";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddEventValidationSchema } from "../addEventForm/model/addEventFormSchema";
import { ISelectInputOptions } from "@/shared/model/types";

const eventTypesArray = [
  { id: 0, name: 'Публичное' },
  { id: 1, name: 'По ссылке' },
]

function ParticipantsAgeControl(): ReactElement {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<AddEventValidationSchema>();

  return (
    <>
      <div className={`flex items-center mt-[18px]`}>
        <LabeledInput
          hookFormRegister={register('participants_age', { valueAsNumber: true })}
          isError={!!errors.participants_age}
          errorMessage={errors.participants_age?.message}
          extraErrorClass="absolute bottom-[-15px] left-0"
          type='number'
          placeholder='18'
          size="sm"
          className="w-[60px] max-h-11 text-[18px] ml-3.5"
          extraInputClass="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          extraBoxClass="!flex-row !items-center relative"
          labelText='Возраст участников'
          extraLabelClass="text-[20px]"
        />
        <p className={`text-xl text-text-black font-medium ml-1.5`}>+</p>
      </div>

      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            error={errors.type?.message}
            labelText='Доступ к мероприятию'
            onChange={(option: ISelectInputOptions) => {
              onChange(option.name === 'По ссылке' ? 'private' : 'open');
            }}
            value={value ? value === 'open' ? eventTypesArray[0] : eventTypesArray[1] : undefined}
            options={eventTypesArray}
            placeholder='Публичное/по ссылке'
            extraBoxClass="mt-[18px]"
          />
        )}
      />
    </>
  )
}

export default ParticipantsAgeControl;

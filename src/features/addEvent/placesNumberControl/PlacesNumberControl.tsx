import { LabeledInput, SwitchInput } from "@/shared";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddEventValidationSchema } from "../addEventForm/model/addEventFormSchema";

export function PlacesNumberControl(): ReactElement {
  const {
    register,
    formState: { errors },
    control,
    clearErrors,
    watch,
    setValue
  } = useFormContext<AddEventValidationSchema>();

  const isPlacesDisabled = watch('any_participant_number');

  return (
    <div className={'flex items-center'}>
      <LabeledInput
        hookFormRegister={register('desired_participants_number', { valueAsNumber: true })}
        isError={!!errors.desired_participants_number}
        errorMessage={errors.desired_participants_number?.message}
        extraErrorClass="absolute bottom-[-15px] left-0"
        type='number'
        placeholder='25'
        className={`w-[70px] max-h-11 ml-3.5 text-[18px] ${isPlacesDisabled ? "bg-select-disable" : ""}`}
        extraBoxClass="!flex-row !items-center relative"
        size="sm"
        extraInputClass={`text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isPlacesDisabled && "text-white"}`}
        disabled={isPlacesDisabled}
        labelText='Количество мест'
        extraLabelClass="text-[20px]"
      />
      <Controller
        control={control}
        name='any_participant_number'
        render={({ field: { onChange, value }}) => (
          <SwitchInput
            labelText={'Места не ограничены'}
            extraBoxClass={'ml-[60px]'}
            onChange={(state: boolean) => {
              onChange(state);

              state && setValue('desired_participants_number', null, { shouldDirty: true });

              clearErrors('desired_participants_number');
            }}
            value={value}
          />
        )}
      />
    </div>
  )
}

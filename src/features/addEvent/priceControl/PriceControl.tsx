import { LabeledInput, SelectInput, SwitchInput } from "@/shared";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddEventValidationSchema } from "../addEventForm/model/addEventFormSchema";
import { ISelectInputOptions } from "@/shared/model/types";

interface IPriceControlProps {
  currencies: ISelectInputOptions[];
}

export function PriceControl({ currencies }: IPriceControlProps): ReactElement {
  const {
    register,
    formState: { errors },
    control,
    watch,
    clearErrors,
    setValue
  } = useFormContext<AddEventValidationSchema>();

  const isPriceActive = !watch('free');

  return (
    <div className={'flex items-center mt-[18px]'}>
      <LabeledInput
        hookFormRegister={register('cost')}
        isError={!!errors.cost}
        errorMessage={errors.cost?.message}
        extraErrorClass="absolute bottom-[-20px] left-0"
        type='number'
        placeholder={`${isPriceActive ? "12" : ""}`}
        className={`w-[90px] max-h-11 text-[18px] mr-1.5 ml-3.5 ${!isPriceActive && "bg-select-disable"}`}
        size="sm"
        extraBoxClass={`!flex-row !items-center relative`}
        extraInputClass={`text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${!isPriceActive && "text-white"}`}
        disabled={!isPriceActive}
        labelText='Стоимость'
        extraLabelClass="text-[20px]"
      />
      <Controller
        control={control}
        name="currency"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            extraBoxClass={'w-[90px] my-auto'}
            extraContentClass={`pl-[14px] pr-[10px] ${isPriceActive ? "" : "bg-select-disable cursor-default"}`}
            extraDropdownClass={'w-[90px]'}
            isDisabled={!isPriceActive}
            options={currencies}
            onChange={(option: ISelectInputOptions) => {
              onChange(option.id)
            }}
            value={currencies.find((el) => el.id === value)}
          />
        )}
      />
      <Controller
        control={control}
        name="free"
        render={({ field: { onChange, value } }) => (
          <SwitchInput
            labelText={'Бесплатное'}
            extraBoxClass={'ml-[60px]'}
            onChange={(state: boolean) => {
              onChange(state);

              state ? setValue('cost', null, { shouldDirty: true, shouldValidate: true }) : setValue('cost', '', { shouldDirty: true });
              state ? setValue('currency', null, { shouldDirty: true, shouldValidate: true }) : setValue('currency', 1, { shouldDirty: true });

              clearErrors('cost');
            }}
            value={value}
          />
        )}
      />
    </div>
  )
}

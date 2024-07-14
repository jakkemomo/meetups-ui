import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { PeriodicControl } from "@/features/addEvent/periodicControl";
import { Input, LabeledInput } from "@/shared";
import TimeInput from "@/shared/ui/Inputs/TimeInput";
import { ReactElement, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

export function TimeControl(): ReactElement {
  const startTimeId = useId();
  const endTimeId = useId();

  const {
    register,
    formState: { errors },
    control,
    watch
  } = useFormContext<AddEventValidationSchema>();

  return (
    <>
      <div className='flex mt-[18px]'>
        <LabeledInput
          hookFormRegister={register('start_date')}
          isError={!!errors.start_date}
          errorMessage={errors.start_date?.message}
          extraErrorClass="ml-[22px] mt-[7px] leading-[20px]"
          type='date'
          placeholder='Начало'
          className={`w-[480px] text-[18px] mt-[7px] h-[44px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
          size="lg"
          max="9999-12-31"
          disabled={watch('repeatable')}
          labelText="Дата"
          extraLabelClass="text-[20px] leading-[25px]"
        />
        <div
          className='w-4 h-0.5 mx-3.5 mt-[54px] border-1 border-text-light-gray border-solid rounded-full'
        />
        <div className='mt-8 relative max-h-[44px]'>
          <Input
            hookFormRegister={register('end_date')}
            isError={!!errors.end_date}
            type='date'
            placeholder='Конец'
            className={`w-[480px] h-[44px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
            size="lg"
            max="9999-12-31"
            disabled={watch('repeatable')}
          />
          <p className={`absolute bottom-[-27px] left-[22px] leading-[20px] ${errors.end_date ? "text-input-error" : "text-text-light-gray"}`}>
            {errors.end_date ? errors.end_date.message : "Необязательное поле"}
          </p>
        </div>
      </div>

      <div className='flex flex-col relative mt-[20px]'>
        <label htmlFor={startTimeId} className="text-xl cursor-pointer leading-[25px]">Время</label>
        <div className="flex mt-[7px]">
          <div className="flex flex-col">
            <Controller
              control={control}
              name="start_time"
              render={({ field: { onChange, value } }) => (
                <TimeInput
                  onStringChange={onChange}
                  stringValue={value}
                  error={errors.start_time?.message}
                  extraFieldClass={`flex items-center w-[480px] h-[44px] px-[22px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
                  extraSegmentClass="text-[18px]"
                  id={startTimeId}
                  isDisabled={watch('repeatable')}
                />
              )}
            />
            {errors.start_time && <p className="text-input-error mt-[7px] ml-[22px] leading-[20px]">{errors.start_time.message}</p>}
          </div>
          <div
            className='w-4 h-0.5 mx-3.5 mt-[22px] border-1 border-text-light-gray border-solid rounded-full'
          />
          <div className="max-h-[44px] relative">
            <Controller
              control={control}
              name="end_time"
              render={({ field: { onChange, value } }) => (
                <TimeInput
                  onStringChange={onChange}
                  stringValue={value}
                  error={errors.end_time?.message}
                  extraFieldClass={`flex items-center w-[480px] h-[44px] px-[22px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
                  extraSegmentClass="text-[18px]"
                  id={endTimeId}
                  isDisabled={watch('repeatable')}
                />
              )}
            />
            <p className='text-text-light-gray absolute bottom-[-27px] left-[22px] leading-[20px]'>Необязательное поле</p>
          </div>
        </div>
      </div>

      <div className="mt-[30px] mb-[18px] text-text-black">
        <Controller
          control={control}
          name="schedule"
          render={({ field: { onChange, value } }) => (
            <PeriodicControl
              isPeriodic={watch('repeatable')}
              onChange={onChange}
              schedule={value ?? []}
              error={errors.schedule?.message}
            />
          )}
        />
      </div>
    </>
  )
}

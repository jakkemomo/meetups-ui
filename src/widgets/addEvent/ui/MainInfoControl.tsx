import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { MainImageControl } from "@/features/addEvent/mainImageControl";
import { LabeledInput, LargeTextInput, SelectInput } from "@/shared";
import { ISelectInputOptions } from "@/shared/model/types";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IMainInfoProps {
  categories: ISelectInputOptions[];
}

export function MainInfoControl({ categories }: IMainInfoProps): ReactElement {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<AddEventValidationSchema>();

  return (
    <>
      <div className="flex items-start mt-10">
        <div className="flex flex-col justify-start mr-[45px]">
          <LabeledInput
            hookFormRegister={register('name')}
            type='text'
            isError={!!errors.name}
            errorMessage={errors.name?.message}
            extraErrorClass="ml-[22px]"
            extraBoxClass="relative"
            placeholder='Введите название'
            maxLength={250}
            className="text-[18px] w-[480px] mt-[7px]"
            labelText="Название"
            extraLabelClass="text-[20px]"
            size="lg"
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                value={categories.find((el) => el.id === value)}
                onChange={(option: ISelectInputOptions) => {
                  onChange(option.id);
                }}
                error={errors.category?.message}
                extraErrorClass="ml-[22px]"
                labelText='Категория'
                options={categories}
                placeholder='Выберите категорию'
                extraBoxClass="mt-[18px] relative"
              />
            )}
          />

        </div>
        <Controller
          control={control}
          name="image_url"
          render={({ field: { onChange, value }}) => (
            <MainImageControl
              error={errors.image_url?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>

      <LargeTextInput
        hookFormValues={register('description')}
        error={errors.description?.message}
        labelText='Описание'
        placeholder='Расскажите подробнее'
        extraBoxClass={'mt-[18px]'}
        maxLength={250}
      />
      {errors.description && <p className="text-input-error mt-[7px] ml-[22px]">{errors.description.message}</p>}
    </>
  )
}

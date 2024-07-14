import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { EditFavoriteList } from "./EditFavoriteList";
import { SwitchInput } from "@/shared";
import { ICategory } from "@/features/searchFilter/model/types";
import { privateOptionText } from "../model/constants";

interface IEditOptions {
  categories: ICategory[] | [];
  isSuccess: boolean;
}

export function EditOptions({ categories }: IEditOptions): ReactElement {
  const {
    control,
  } = useFormContext<EditProfileValidationSchema>();

  return (
    <div>
      <Controller
        control={control}
        name="category_favorite"
        render={({ field: { onChange, value } }) => (
          <EditFavoriteList
            categories={categories}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <div className="mt-[24px]">
        <p className="text-[20px]">Приватность профиля</p>
        <Controller
          control={control}
          name="is_private"
          render={({ field: { onChange, value } }) => (
            <SwitchInput
              labelText={"Сделать приватным"}
              extraBoxClass={"mt-[18px] text-[10px]"}
              onChange={(state: boolean) => {
                onChange(state);
              }}
              value={value}
            />
          )}
        />
        <p className="mt-[14px] text-neutral-400 max-w-[480px]">
          {privateOptionText}
        </p>
      </div>
    </div>
  );
}

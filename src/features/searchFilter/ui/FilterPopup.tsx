import { CheckboxWithValue, Input } from "@/shared";
import { ChangeEvent, ReactElement, useState } from "react";
import { ICategory } from "../model/types";
import { useAppDispatch } from "@/shared/model";
import { isPopupOpenSetted } from "../model/filterPopupSlice";
import { categorySetted } from "../model/SearchFilterSlice";

interface IFilterPopupProps {
  categories: ICategory[];
}

export function FilterPopup({ categories }: IFilterPopupProps): ReactElement {
  const dispatch = useAppDispatch();
  const [checkedCategories, setCheckedCategories] = useState<ICategory[]>([]);

  const handleCheckedCategories = (e: ChangeEvent<HTMLInputElement>, category: ICategory) => {
    e.target.checked
    ? setCheckedCategories((state) => ([...state, category]))
    : setCheckedCategories((state) => state.filter((el) => el.id !== category.id));
  }

  const onButtonClick = () => {
    dispatch(isPopupOpenSetted(false));

    const checkedCategoriesString = checkedCategories.map((el) => el.name).join(',');

    dispatch(categorySetted(checkedCategoriesString));
  }

  return (
    <>
      <div className="absolute flex flex-col top-[100px] left-[50%] translate-x-[-50%] bg-white min-w-[584px] rounded-[10px] px-[45px] py-[35px]">
        <div onClick={() => dispatch(isPopupOpenSetted(false))} className="absolute top-[42px] right-[45px] bg-close-cross bg-no-repeat bg-cover bg-center w-6 h-6 cursor-pointer"></div>
        <div className="flex items-center">
          <h2 className="text-[30px] font-semibold leading-[37.65px]">Фильтр</h2>
          <div className="bg-filter-icon w-6 h-6 bg-cover bg-no-repeat bg-center ml-3"></div>
        </div>
        <div className="flex mt-5">
          <div className="">
            <h3 className="text-[24px] font-semibold leading-[30.12px] w-[148px]">Катерогии</h3>
            {
              categories.map((category, index) =>
              <CheckboxWithValue
                key={index}
                id={String(category.id)}
                value={category.name}
                extraBoxClass="mt-3 first-of-type:mt-4"
                extraLabelClass="ml-2"
                onChangeFunc={(e) => handleCheckedCategories(e, category)}
              />
            )
            }
          </div>
          <div className="flex flex-col ml-[45px]">
            <h3 className="text-[24px] font-semibold leading-[30.12px]">Возраст</h3>
            <div className="flex items-center mt-4">
              <Input
                HTMLType="text"
                extraBoxClass="w-[60px]"
                placeholder="18"
                extraContentClass="h-[44px]"
                extraInputClass="px-[19px] min-w-[60px] text-[18px]"
              />
              <p className="text-[20px] font-medium ml-[6px]">+</p>
            </div>
          </div>
          <div className="ml-[65px]">
            <h3 className="text-[24px] font-semibold leading-[30.12px] w-[137px]">Стоимость</h3>
            <CheckboxWithValue
              id="paid"
              value="Платное"
              extraBoxClass="mt-3 first-of-type:mt-4"
              extraLabelClass="ml-2"
            />
            <CheckboxWithValue
              id="free"
              value="Бесплатное"
              extraBoxClass="mt-3 first-of-type:mt-4"
              extraLabelClass="ml-2"
            />
          </div>
        </div>
        <button type="button" onClick={onButtonClick} className="text-[18px] font-bold text-white bg-button-purple rounded-[10px] min-h-[44px] min-w-[127px] duration-150 hover:opacity-[0.8] self-end">Найти</button>
      </div>
    </>
  )
}

import { Button, CheckboxWithLabel, Input, Popup } from "@/shared";
import { ChangeEvent, ReactElement, useState } from "react";
import { ICategory } from "../model/types";
import { useAppDispatch, useAppSelector } from "@/shared/model";
import { isPopupOpenSetted } from "../model/filterPopupSlice";
import { categorySetted } from "../model/SearchFilterSlice";
import Svg from "@/shared/ui/Svg";

interface IFilterPopupProps {
  categories: ICategory[];
}

export function FilterPopup({ categories }: IFilterPopupProps): ReactElement {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.filterPopup);
  const { checkedCategories } = useAppSelector((state) => state.searchFilter);
  const [checkedCategoriesArr, setCheckedCategoriesArr] = useState<number[]>(checkedCategories || []);

  const handleCheckedCategories = (e: ChangeEvent<HTMLInputElement>, category: ICategory) => {
    e.target.checked
    ? setCheckedCategoriesArr((state) => ([...state, category.id]))
    : setCheckedCategoriesArr((state) => state.filter((el) => el !== category.id));
  }

  const onButtonClick = () => {
    dispatch(isPopupOpenSetted(false));

    dispatch(categorySetted(checkedCategoriesArr));
  }

  return (
    <Popup isOpen={isOpen} onClose={() => dispatch(isPopupOpenSetted(false))}>
      <div className="absolute flex flex-col top-[100px] left-[50%] translate-x-[-50%] bg-white min-w-[584px] rounded-def px-[45px] py-[35px]">
        <Svg onClick={() => dispatch(isPopupOpenSetted(false))} id="close-cross" className="absolute top-[42px] right-[45px] w-6 h-6 cursor-pointer duration-150 hoverscreen:hover:opacity-70" />
        <div className="flex items-center">
          <h2 className="text-[30px] font-semibold leading-[37.65px]">Фильтр</h2>
          <div className="bg-filter-icon w-6 h-6 bg-cover bg-no-repeat bg-center ml-3"></div>
        </div>
        <div className="flex mt-5">
          <div className="">
            <h3 className="text-[24px] font-semibold leading-[30.12px] w-[148px]">Катерогии</h3>
            {
              categories.map((category, index) =>
              <CheckboxWithLabel
                key={index}
                id={String(category.id)}
                label={category.name}
                extraBoxClass="mt-3 first-of-type:mt-4"
                extraLabelClass="ml-2"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckedCategories(e, category)}
                value={checkedCategories.some((el) => el === category.id)}
              />
            )
            }
          </div>
          <div className="flex flex-col ml-[45px]">
            <h2 className="text-[24px] font-semibold leading-[30.12px]">Возраст</h2>
            <div className="flex items-center mt-4">
              <Input
                type="number"
                placeholder="18"
                className="w-[60px] max-h-11 text-[18px]"
                extraInputClass="text-center"
                size="sm"
              />
              <p className="text-[20px] font-medium ml-1.5">+</p>
            </div>
          </div>
          <div className="ml-[65px]">
            <h3 className="text-[24px] font-semibold leading-[30.12px] w-[137px]">Стоимость</h3>
            <CheckboxWithLabel
              id="paid"
              label="Платное"
              extraBoxClass="mt-3 first-of-type:mt-4"
              extraLabelClass="ml-2"
            />
            <CheckboxWithLabel
              id="free"
              label="Бесплатное"
              extraBoxClass="mt-3 first-of-type:mt-4"
              extraLabelClass="ml-2"
            />
          </div>
        </div>
        <Button
          onClick={onButtonClick}
          importance="primary"
          extraClass="text-[18px] font-semibold text-white bg-main-purple !px-[35px] self-end"
          size="md"
        >Найти</Button>
      </div>
    </Popup>
  )
}

import { Input } from "@/shared";
import { ReactElement } from "react";
import { ICategory } from "../model/types";
import { useAppDispatch } from "@/shared/model";
import { isPopupOpenSetted } from "../model/filterPopupSlice";

interface IFilterPopupProps {
  categories: ICategory[];
}

export function FilterPopup({ categories }: IFilterPopupProps): ReactElement {
  const dispatch = useAppDispatch();

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
              <div key={index} className="flex items-center mt-4">
                <input id={String(category.id)} type="checkbox" className="relative h-5 w-5 m-0.5 cursor-pointer appearance-none rounded-[4px] border-2 border-black bg-center bg-no-repeat checked:bg-check" />
                <label htmlFor={String(category.id)} className="text-[18px] ml-2.5">{category.name}</label>
              </div>
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
            <div className="flex items-center mt-4">
              <input id="paid" type="checkbox" className="relative h-5 w-5 m-0.5 cursor-pointer appearance-none rounded-[4px] border-2 border-black bg-center bg-no-repeat checked:bg-check" />
              <label htmlFor="paid" className="text-[18px] ml-2.5">Платное</label>
            </div>
            <div className="flex items-center mt-3">
              <input id="paid" type="checkbox" className="relative h-5 w-5 m-0.5 cursor-pointer appearance-none rounded-[4px] border-2 border-black bg-center bg-no-repeat checked:bg-check" />
              <label htmlFor="free" className="text-[18px] ml-2.5">Бесплатное</label>
            </div>
          </div>
        </div>
        <button type="button" className="text-[18px] font-bold text-white bg-button-purple rounded-[10px] min-h-[44px] min-w-[127px] duration-150 hover:opacity-[0.8] self-end">Найти</button>
      </div>
    </>
  )
}

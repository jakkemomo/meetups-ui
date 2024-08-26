import { CalendarCard } from "@/shared/ui/CalendarCard";
import { SlickSlider } from "@/shared/ui/SlickSlider/SlickSlider";
import { ICardProps } from "@/shared/types";
import { generateCalendarDays } from "../lib/generateCalendarDays";
import { currentMonth, settings } from "../model/constants";
import { useAppSelector, useAppDispatch } from "@/shared/model";
import {
  selectedDateSetted,
  endDateSetted,
  startDateSetted,
} from "@/features/searchFilter/model/SearchFilterSlice";
import { ReactElement } from "react";

interface IDateSlider {
  isLoading: boolean;
  isFetching: boolean;
}

export function DateSlider({
  isLoading,
  isFetching,
}: IDateSlider): ReactElement {
  const dateArr = generateCalendarDays(40);
  const dispatch = useAppDispatch();
  const { selectedDate, endDate, startDate } = useAppSelector(
    (state) => state.searchFilter
  );

  const onCloseCalendarFilter = () => {
    dispatch(selectedDateSetted(""));
    dispatch(endDateSetted(""));
    dispatch(startDateSetted(""));
  };

  const onHandleClickDate = (date: ICardProps) => {
    switch (true) {
      case !!startDate && !!endDate:
        onCloseCalendarFilter();
        dispatch(selectedDateSetted(date.summary));
        break;
      case date.summary === selectedDate:
        dispatch(selectedDateSetted(date.summary));
        break;
      case !selectedDate:
        dispatch(selectedDateSetted(date.summary));
        break;
      case selectedDate && date.summary > selectedDate:
        dispatch(selectedDateSetted(""));
        dispatch(startDateSetted(selectedDate));
        dispatch(endDateSetted(date.summary));
        break;
      case selectedDate && date.summary < selectedDate:
        dispatch(selectedDateSetted(""));
        dispatch(startDateSetted(date.summary));
        dispatch(endDateSetted(selectedDate));
        break;
    }
  };

  const cards = dateArr.map((el: ICardProps, index: number) => (
    <CalendarCard
      key={index}
      date={el}
      isStartDate={selectedDate === el.summary || startDate === el.summary}
      isEndDate={endDate === el.summary}
      isBetweenDate={el.summary < endDate && el.summary > startDate}
      isSelectedDate={selectedDate === el.summary}
      onClickDate={isLoading || isFetching ? undefined : onHandleClickDate}
      onCloseCalendarFilter={onCloseCalendarFilter}
    />
  ));

  return (
    <div className="flex flex-col relative before:w-[165px] before:absolute before:right-[-5px] before:h-full before:bg-slider-fade-out before:z-10 mt-[50px]">
      <h3 className="capitalize text-[20px] font-normal text-text-black mb-[-29px]">
        {currentMonth}
      </h3>
      <SlickSlider
        extraSettings={settings}
        arrowsExtraClasses={{
          rightArrow: "right-[-12px] top-1/2 translate-y-[-50%]",
          leftArrow: "left-[-42px] top-1/2 translate-y-[-50%]",
        }}
      >
        {cards}
      </SlickSlider>
    </div>
  );
}

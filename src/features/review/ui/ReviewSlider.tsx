import { SlickSlider } from "@/shared";
import { ReactElement, useEffect, useState } from "react";
import { IReview } from "@/entities/review/model/types";
import { ReviewCard } from "@/entities/review/ui/ReviewCard";

interface IReviewSlider {
  reviews: IReview[];
  slidesLength: number;
}

export function ReviewSlider({ reviews, slidesLength }: IReviewSlider): ReactElement {
  const cards = reviews.map((el, index) => <ReviewCard key={index} review={el} />);

  const [slidesToShow, setSlidesToShow] = useState(slidesLength);
  const [sliderWidth, setSlidesWidth] = useState(100);

  useEffect(() => {
    if (reviews.length < slidesLength) {
      setSlidesToShow(reviews.length);
      setSlidesWidth(100 - ((slidesLength - reviews.length) * (100 / slidesLength)));
    } else {
      setSlidesToShow(slidesLength);
      setSlidesWidth(100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length]);

  const settings = {
    slidesToShow,
    slidesToScroll: 1,
    speed: 400,
    className: `mt-5 max-w-[${String(sliderWidth).slice(0, 4)}%] min-h-[230px]`
  }

  return (
    <SlickSlider extraSettings={settings} arrowsExtraClasses={{rightArrow: 'right-[-12px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}>
      {cards}
    </SlickSlider>
  )
}

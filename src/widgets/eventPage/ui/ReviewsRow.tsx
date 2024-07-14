import { IReview } from "@/entities/review/model/types";
import { ReviewSlider } from "@/features/review";
import Svg from "@/shared/ui/Svg";
import { ReactElement } from "react";

interface IReviewsRow {
  reviews: IReview[];
  rating: number | null;
}

export function ReviewsRow({reviews, rating}: IReviewsRow): ReactElement {
  return (
    <section className="relative w-full before:w-[198px] before:absolute before:right-[-45px] before:h-full before:bg-slider-fade-out before:z-10 before:pointer-events-none">
      <h2 className="text-text-black text-[28px] font-semibold mt-[92px]">
        Отзывы
      </h2>
      {
        rating ? (
          <div className="flex font-semibold text-[18px] mt-[25px]">
            <p>Рейтинг:</p>
            <Svg id="star" className="w-6 h-6"/>
          </div>
        ) : (
          <p className="">Нет рейтинга</p>
        )
      }

      {reviews && reviews.length > 0 ? (
        <ReviewSlider reviews={reviews} slidesLength={3}></ReviewSlider>
      ) : (
        <div>No reviews yet.</div>
      )}
    </section>
  )
}

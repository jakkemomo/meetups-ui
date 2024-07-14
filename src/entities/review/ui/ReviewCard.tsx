import { ReactElement, useState } from "react";
import { IReview } from "../model/types";
import { config } from "@/shared/config";
import Svg from "@/shared/ui/Svg";
import { Button } from "@/shared";
import { useOverflowY } from "@/shared/lib/hooks/useOverflowY";

export interface IReviewCard {
  review: IReview;
}

export function ReviewCard({ review }: IReviewCard): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const { ref, isOverflowY } = useOverflowY();

  const renderStars = (rating: number) => {
    const starsArr = [];
    const fullStars = Math.floor(rating/1);

    for (let i = 0; i < fullStars; i++) {
      starsArr.push('star');
    }

    if (rating % 1 !== 0) {
      starsArr.push('half-star');
    }

    while (starsArr.length < 5) {
      starsArr.push('empty-star');
    }

    return starsArr.map((el, index) => <Svg key={index} id={el} className="w-6 h-6 mr-1.5" />);
  };

  const handleIsOpenState = () => {
    setIsOpen((state) => !state);
  }

  return (
    <div className="flex flex-col bg-white w-[375px] min-h-[255px]">
      <div className="flex">
        <div className="flex flex-col rounded-t-[14px] w-full bg-custom-gray px-6 pt-[19px]">
          <h3 className="text-[18px] leading-[23px] font-semibold text-text-black">{review.created_by.username}</h3>
          <div className="flex mt-[5px]">
            {renderStars(review.rating)}
          </div>
        </div>
        <div className="bg-custom-gray shrink-0">
          <div className="flex justify-end w-[70px] h-full ml-auto bg-white rounded-es-[25px]">
            <img src={`${config.BASE_IMAGE_URL}${review.created_by.image_url}`} alt={`Аватар пользователя ${review.created_by.username}`} className="profile-pic h-[60px] w-[60px] rounded-full"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col grow bg-custom-gray rounded-r-[14px] rounded-es-[14px] px-6 py-[18px]">
        <div ref={ref} className={`relative overflow-y-hidden ${isOpen ? "" : "max-h-[115px]"}`}>
          <p className={`text-lg whitespace-pre-wrap break-words font-light text-neutral-600 after:absolute after:w-[137px] after:h-[18px] after:bottom-0 after:right-0 after:bg-review-text-fade-out after:block"}`}>{review.review}</p>
        </div>
        <div className={`flex items-center justify-between ${isOpen ? "mt-[17px]" : "mt-auto"}`}>
          <p className="text-[14px] leading-[18px] text-[#737373]">{new Date(review.created_at).toLocaleDateString()}</p>
          {
            isOverflowY && (
              <Button
                type="button"
                extraClass="!text-[14px] !leading-[18px] !text-[#737373]"
                onClick={handleIsOpenState}
              >
                {isOpen ? "свернуть" : "весь отзыв"}
                <Svg
                  id="slider-chevron"
                  className={`w-5 h-5 ml-1 ${isOpen ? "rotate-[-90deg]" : "rotate-90"}`}
                  viewBox="0 0 36 36"
                />
              </Button>
            )
          }
        </div>
      </div>
    </div>
  )
}

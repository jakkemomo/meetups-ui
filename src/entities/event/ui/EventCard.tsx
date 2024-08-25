import {MouseEvent, ReactElement, useEffect, useState} from "react";
import {IEvent} from "../model/types";
import { useNavigate } from "react-router-dom";
import Svg from "@/shared/ui/Svg";
import { useLikeEventMutation, useUnlikeEventMutation } from "../api/eventApi";
import cx from 'classnames';

export interface IEventCard {
  event: IEvent;
  size?: 'sm' | 'lg';
  extraCardClass?: string;
}

export function EventCard({
  event,
  size = 'lg',
  extraCardClass = ''
}: IEventCard): ReactElement {
  const [isFavorite, setIsFavorite] = useState(event.is_favorite);

  const navigate = useNavigate();

  const [likeEvent] = useLikeEventMutation();
  const [unlikeEvent] = useUnlikeEventMutation();

  const onLike = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    setIsFavorite(true);

    likeEvent(event.id)
      .unwrap()
      .then(() => {return})
      .catch(() => setIsFavorite(false));
  }

  const onUnlike = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    setIsFavorite(false);

    unlikeEvent(event.id)
      .unwrap()
      .then(() => {return})
      .catch(() => setIsFavorite(true));
  }

  useEffect(() => {
    setIsFavorite(event.is_favorite);
  }, [event])

  return (
      <div className={
        cx(
          "relative w-full flex flex-col my-3 ml-2.5", {
            'max-w-[225px] mr-[40px]': size === 'sm',
            'max-w-[270px] mr-[45px]': size === 'lg'
          },
          extraCardClass
        )}>
          <div
            onClick={() => navigate(`/events/${event.id}`)}
            className="absolute inset-[-10px] hoverscreen:hover:border-1 border-solid border-main-violet-600 hoverscreen:hover:rounded-def cursor-pointer z-10"
          />
          <div className="flex justify-between">
            <p className={
              cx(
                "capitalize", {
                  'text-[12px]': size === 'sm',
                  'text-[14px]': size === 'lg'
                }
              )}>{event.category?.name}</p>
            <Svg
              id="heart-icon"
              className={
                cx(
                "cursor-pointer z-20 duration-150 hoverscreen:hover:opacity-70", {
                  'w-5 h-5': size === 'sm',
                  'w-6 h-6': size === 'lg'
                }
              )}
              viewBox="0 0 24 24"
              onClick={isFavorite ? (e) => onUnlike(e) : (e) => onLike(e)}
              extraUseClass={isFavorite ? "!fill-main-violet-600 stroke-main-violet-600" : "stroke-text-black"}
            />
          </div>
          <figure className={
            cx(
              "flex flex-col cursor-pointer rounded-12 max-h-[188px] mt-[7px] overflow-hidden", {
                'max-h-[157px]': size === 'sm',
                'max-h-[188px]': size === 'lg'
              }
            )}>
              <img className={
                cx(
                  "duration-300 ease-in-out rounded-t-def object-cover", {
                    'h-[120px]': size === 'sm',
                    'h-[143px]': size === 'lg'
                  }
                )
              } src={`https://storage.googleapis.com/meetups-dev/media/${event.image_url}`} alt={`Изображение ивента ${event.name}`} />
              <div className={
                cx(
                  `h-[45px] bg-secondary-100 rounded-b-def flex items-center justify-center relative ${event.name.length > 21 && "before:w-[60px] before:rounded-b-[12px] before:absolute before:right-0 before:h-full before:bg-text-fade-out pl-4"}`, {
                    'h-[37px]': size === 'sm',
                    'h-[45px]': size === 'lg'
                  }
                )}>
                  <figcaption className={
                    cx(
                      "capitalize font-semibold text-text-black overflow-hidden whitespace-nowrap text-clip", {
                        'text-[16px]': size === 'sm',
                        'text-[20px]': size === 'lg'
                      }
                    )
                  }>{event.name}</figcaption>
              </div>
          </figure>
          <div className={
            cx(
              "flex justify-between", {
                'mt-2': size === 'sm',
                'mt-2.5': size === 'lg'
              }
            )
          }>
            <div className={
              cx(
                "flex flex-col font-medium", {
                  'text-[14px] leading-[18px]': size === 'sm',
                  'text-[18px] leading-def': size === 'lg'
                }
              )
            }>
              <p>{new Date(event.start_date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})}</p>
              <p className="mt-0.5">{event.start_time ? event.start_time.slice(0, 5) : ''}</p>
            </div>
            <div className={
              cx(
                "flex flex-col", {
                  'text-[12px] leading-[15px]': size === 'sm',
                  'text-[14px] leading-[18px]': size === 'lg'
                }
              )}>
                <div className="flex items-center">
                  <p>6/12</p>
                  <Svg
                    viewBox={
                      cx("", {
                        '0 0 30 30': size === 'sm',
                        '0 0 32 32': size === 'lg'
                      })
                    }
                    id="person-quantity-icon"
                    className={
                      cx(
                        "ml-1", {
                          'w-5 h-5': size === 'sm',
                          'w-6 h-6': size === 'lg'
                        }
                      )
                    }
                  />
                </div>
                {
                  (!!event.average_rating) && (
                    <div className="flex items-start mt-0.5 self-end">
                      <p>{event.average_rating}</p>
                      <Svg
                        id='rating-star'
                        extraUseClass="!fill-current"
                        className={
                          cx(
                            'ml-[7px]', {
                              'w-[15px] h-[15px]': size === 'sm',
                              'w-[18px] h-[18px]': size === 'lg'
                            }
                          )
                        } />
                    </div>
                  )
                }
            </div>
          </div>
      </div>
  )
}

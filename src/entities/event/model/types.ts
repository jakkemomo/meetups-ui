import { IParticipant } from "@/entities/eventParticipants/model/types";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { IDay } from "@/features/addEvent/periodicControl/model/types";

export interface IEventTag {
  id: number,
  name: string
}

interface IEventCurrency {
  name: string;
  id: number;
}

export interface IEvent {
  id: number,
  name: string,
  average_rating: number | null,
  image_url: string,
  description: string,
  start_date: string,
  end_date: string | null,
  start_time: string,
  end_time: string | null,
  tags: IEventTag[] | [],
  address: string,
  category: IEventTag | null,
  participants_number: number,
  is_favorite: boolean
}

export interface IGetEventRequest {
  search?: string;
  ordering?: 'start_date' | 'average_rating' | 'participants_number' | '-start_date' | '-average_rating' | '-participants_number';
  name?: string;
  name_contains?: string;
  start_date?: string;
  start_date_gte?: string;
  start_date_lte?: string;
  end_date?: string;
  end_date_gte?: string;
  end_date_lte?: string;
  average_rating__gte?: string;
  average_rating__lte?: string;
  tags?: string;
  tags_in?: string;
  category?: string;
  category_in?: string;
  city?: string;
  city_in?: string;
  free?: string;
  participants_age?: string;
  participants_age__gte?: string;
  participants_age__lte?: string;
  limit?: number;
  offset?: number;
}

export interface IDetailedEvent {
  id: number,
  name: string,
  average_rating: number | null,
  image_url: string,
  description: string,
  start_date: string,
  end_date: string | null,
  start_time: string,
  end_time: string | null,
  tags: IEventTag[] | [],
  address: string,
  category: IEventTag,
  participants_number: number,
  desired_participants_number: number,
  created_by: IParticipant,
  participants: IParticipant[],
  gallery: string[],
  free: boolean,
  cost: string,
  any_participant_number: boolean,
  location: number[],
  currency: IEventCurrency,
  type: 'open' | 'private',
  is_visible: boolean,
  is_finished: boolean,
  private_token: string | null,
  is_favorite: boolean,
  is_participant: boolean,
  repeatable: boolean,
  schedule: IDay[],
  city: string,
  country: string,
  participants_age: number
}

export interface IEditEventRequest {
  eventInfo: Partial<AddEventValidationSchema>;
  eventId: number;
}

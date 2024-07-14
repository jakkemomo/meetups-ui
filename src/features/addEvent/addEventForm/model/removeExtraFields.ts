import { IDetailedEvent } from "@/entities/event/model/types";
import { AddEventValidationSchema } from "./addEventFormSchema";

export const removeExtraFields = (event: IDetailedEvent): AddEventValidationSchema => {
  return {
    name: event.name,
    category: event.category.id,
    image_url: event.image_url,
    description: event.description,
    start_date: event.start_date ? new Date(event.start_date).toISOString().split('T')[0] : '',
    end_date: event.end_date ? new Date(event.end_date).toISOString().split('T')[0] : '',
    start_time: event.start_time ? event.start_time.slice(0, 5) : '',
    end_time: event.end_time ? event.end_time.slice(0, 5) : '',
    repeatable: event.repeatable,
    schedule: event.schedule,
    address: event.address,
    city: event.city,
    country: event.country,
    location: { latitude: String(event.location[1]), longitude: String(event.location[0])},
    city_north_east_point: { longitude: '', latitude: ''},
    city_south_west_point: { longitude: '', latitude: ''},
    desired_participants_number: event.desired_participants_number,
    any_participant_number: event.any_participant_number,
    participants_age: event.participants_age,
    type: event.type,
    cost: event.cost ? event.cost.split('.')[0] : null,
    currency: event.currency ? event.currency.id : null,
    free: event.free,
    gallery: event.gallery,
    tags: event.tags.map((el) => el.id)
  }
}

import { z } from "zod";

export const addEventSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Назовите ваше мероприятие' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  category: z
    .number({ required_error: 'Выберите одну из  категорий', invalid_type_error: 'Это обязательное поле' })
    .min(1, { message: 'Выберите одну из  категорий' }),
  image_url: z
    .string({ required_error: 'Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера', invalid_type_error: 'Это обязательное поле' })
    .min(1, { message: 'Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера' }),
  description: z
    .string()
    .min(1, { message: 'Это обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  start_date: z
    .string()
    .nullable(),
  end_date: z
    .string()
    .nullable(),
  start_time: z
    .string()
    .nullable(),
  end_time: z
    .string()
    .nullable(),
  repeatable: z
    .boolean({ required_error: 'Это обязательное поле', invalid_type_error: 'Это обязательное поле' }),
  schedule: z.object({
    id: z.number().optional(),
    day_of_week: z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']),
    time: z.string({ invalid_type_error: 'Это обязательное поле' })
  }).array().nullable(),
  address: z
    .string({ required_error: 'Это обязательное поле', invalid_type_error: 'Это обязательное поле' })
    .min(1, { message: 'Это обязательное поле' })
    .max(250, { message: 'Максимальная длина - 250 символов' }),
  city: z
    .string({ required_error: 'Укажите адрес, включающий в себя населенный пункт'})
    .min(1, { message: 'Укажите адрес, включающий в себя населенный пункт' }),
  country: z
    .string()
    .min(1, { message: 'Сломался поиск адреса' }),
  location: z
    .object({
      latitude: z.string(),
      longitude: z.string()
    }),
  city_south_west_point: z
    .object({
      latitude: z.string(),
      longitude: z.string()
    }),
  city_north_east_point: z
    .object({
      latitude: z.string(),
      longitude: z.string()
    }),
  desired_participants_number: z
    .number({ required_error: 'Это обязательное поле', invalid_type_error: 'Это обязательное поле' })
    .int({ message: 'Укажите целое чисто'})
    .nonnegative({ message: 'Кол-во участников должно быть >= 0' })
    .max(10000000, { message: 'Кол-во участников должно быть < 10000000' })
    .nullable(),
  any_participant_number: z
    .boolean({ required_error: 'Это обязательное поле', invalid_type_error: 'Это обязательное поле' }),
  participants_age: z
    .number({ required_error: 'Это обязательное поле', invalid_type_error: 'Это обязательное поле' })
    .int({ message: 'Укажите целое чисто'})
    .nonnegative({ message: 'Возраст должен быть >= 0' })
    .max(99, { message: 'Максимальный возраст - 100' })
    .nullable(),
  type: z
    .enum(['open', 'private'], { required_error: 'Это обязательное поле' }),
  cost: z
    .string({ required_error: 'Это обязательное поле', invalid_type_error: 'Это обязательное поле' })
    .min(1, { message: 'Это обязательное поле' })
    .nullable(),
  currency: z
    .number()
    .nullable(),
  free: z
    .boolean({ required_error: 'Это обязательное поле', invalid_type_error: 'Это обязательное поле' }),
  gallery: z
    .string({ invalid_type_error: 'Это обязательное поле' })
    .array(),
  tags: z
    .number()
    .array(),
}).refine((data) => !data.start_date || new Date(`${data.start_date} 24:00`) > new Date(), {
  message: 'Ивент должен начинаться в будущем',
  path: ['start_date']
}).refine((data) => !data.end_date || new Date(`${data.end_date} 24:00` ?? '') > new Date(data.start_date ?? ''), {
  message: 'Ивент должен заканчиваться после начала',
  path: ['end_date']
}).refine((data) => data.repeatable || data.start_date, {
  message: 'Введите дату начала мероприятия',
  path: ['start_date']
}).refine((data) => data.repeatable || data.start_time, {
  message: 'Введите время начала мероприятия',
  path: ['start_time']
}).refine((data) => !data.repeatable || (data.schedule && data.schedule.length > 0), {
  message: 'Заполните расписание',
  path: ['schedule']
}).refine((data) => data.address && data.city, {
  message: 'Укажите адрес, включающий в себя населенный пункт',
  path: ['address']
})

export type AddEventValidationSchema = z.infer<typeof addEventSchema>;

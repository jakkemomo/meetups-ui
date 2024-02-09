import { z } from 'zod'

export const userDataSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Неверный формат' }),
  username: z
    .string()
    .min(2, { message: 'Имя пользователя должно быть не менее 2 символов' })
    .max(128, { message: 'Имя пользователя должно быть не более 128 символов'})
    .regex(/^[A-Za-zА-Яа-я \-\_0-9]{2,128}$/, {message: 'Имя пользователя может содержать только латинские, кириллические символы, цифры, символы пробела, тире и подчеркивания'})
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Неверное количество символов' }),
});

export type UserDataValidationSchema = z.infer<typeof userDataSchema>;
export type PasswordValidationSchema = z.infer<typeof passwordSchema>;

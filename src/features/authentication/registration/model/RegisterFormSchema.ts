import { z } from 'zod'

export const userDataSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Почта должна быть в формате abc@email.com', }),
  username: z
    .string()
    .min(2, { message: 'Имя пользователя должно быть не менее 2 символов' }),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

export type UserDataValidationSchema = z.infer<typeof userDataSchema>;
export type PasswordValidationSchema = z.infer<typeof passwordSchema>;

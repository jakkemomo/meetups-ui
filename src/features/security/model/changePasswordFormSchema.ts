import { z } from "zod";

export const changePasswordSchema = z.object({
  old_password: z
    .string(),
  password: z
    .string()
    .min(8, { message: 'Минимальная длина пароля - 8 символов' }),
  repeat_password: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
}).refine((data) => data.password === data.repeat_password, {
  message: 'Пароли не совпадают',
  path: ['repeat_password']
})

export type ChangePasswordValidationSchema = z.infer<typeof changePasswordSchema>;

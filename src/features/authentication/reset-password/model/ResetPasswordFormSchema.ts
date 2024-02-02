import { z } from 'zod'

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Почта должна быть в формате abc@email.com', }),
})

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
})

export type EmailValidationSchema = z.infer<typeof emailSchema>
export type PasswordValidationSchema = z.infer<typeof passwordSchema>

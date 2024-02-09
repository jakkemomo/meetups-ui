import { z } from 'zod'

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Неверный формат', }),
})

export const passwordSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Обязательное поле', required_error: 'Обязательное поле'})
    .min(8, { message: 'Неверное количество символов' }),
})

export type EmailValidationSchema = z.infer<typeof emailSchema>
export type PasswordValidationSchema = z.infer<typeof passwordSchema>

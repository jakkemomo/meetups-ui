import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ invalid_type_error: 'Обязательное поле', required_error: 'Обязательное поле'})
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Неверный формат', }),
  password: z
    .string({ invalid_type_error: 'Обязательное поле', required_error: 'Обязательное поле'})
    .min(6, { message: 'Минимум 6 символов' }),
})

export type LoginValidationSchema = z.infer<typeof loginSchema>

import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Неверный формат', }),
  password: z
    .string()
    .min(6, { message: 'Минимум 6 символов' }),
})

export type LoginValidationSchema = z.infer<typeof loginSchema>

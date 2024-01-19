import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Обязательное поле' })
    .email({ message: 'Почта должна быть в формате abc@email.com', }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
})

export type LoginValidationSchema = z.infer<typeof loginSchema>

import { z } from "zod";

export const changeEmailSchema = z.object({
  oldEmail: z
    .string()
    .email(),
  email: z
    .string()
    .email()
}).refine((data) => data.oldEmail.toLowerCase() !== data.email.toLowerCase(), {
  message: 'Почта должна отличаться от старой',
  path: ['email']
})

export type ChangeEmailValidationSchema = z.infer<typeof changeEmailSchema>;

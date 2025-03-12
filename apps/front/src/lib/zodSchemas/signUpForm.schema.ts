import { z } from "zod";

export const SignUpFormSchema = z.object(
  {
    name: z.string().min(2).trim(),
    email: z.string().email(),
    password: z.string()

      .min(8)
      // .regex(new RegExp('.*[A-Z].*', 'i'), { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
      .regex(/[a-z]/, { message: 'Пароль должен содержать хотя бы одну строчную букву' })
      .regex(/[A-Z]/, { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
      .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
      //Исключая любой символ, входящий в набор [a-zA-Z0-9]
      .regex(/[^a-zA-Z0-9]/, { message: 'Пароль должен содержать хотя бы один специальный символ' })
      .trim()
  }
)
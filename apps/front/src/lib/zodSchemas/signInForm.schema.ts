import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Некорректный адрес электронной почты' }),
  password: z.string().min(1, { message: 'Поле пароля не может быть пустым' }),
});
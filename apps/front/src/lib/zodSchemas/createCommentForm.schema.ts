import { z } from 'zod';

export const СreateCommentFormSchema = z.object({
  postId: z.string()
    //Преобразуем строку в число.
    .transform((value) => parseInt(value))
    //Проверяем (убеждаемся), что ID поста является числом. Если нет, то возвращаем ошибку валидации.
    .refine((value) => !isNaN(value), { message: 'Неверный ID поста' }),
  content: z.string().min(5, { message: 'Комментарий не может быть пустым' }),
});
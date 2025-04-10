import { z } from 'zod';

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Поле заголовка не может быть короче 5 символов' }).max(100, { message: 'Поле заголовка не может быть длиннее 100 символов' }),
  content: z
    .string()
    .min(1, { message: 'Поле содержания не может короче 20 символов' }),
  tags: z
    .string()
    .min(1, { message: 'Поле тегов не может быть пустым' })
    //Если callback-функция, переданная в refine, возвращает false, то возникает ошибка валидации.
    // Уточняем, что каждый тег (строка между двумя запятыми) не является пустой строкой.
    //tag1, tag2, , tag3 не пройдёт валидацию.
    .refine((value) => (value.split(',').every(tag => tag.trim() !== '')), { message: 'Тег не может быть пустым' })
    .transform(value => value.split(',').map(tag => tag.trim())),
  thumbnail: z.instanceof(File).optional(),
  //Преобразуем строку в boolean. Если чекбокс выбран (stringValue === 'on') , то возвращаем true.
  published: z
    .string()
    .optional()
    .transform(value => value === 'on'),
});
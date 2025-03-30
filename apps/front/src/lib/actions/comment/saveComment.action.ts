'use server';
import { print } from 'graphql/index';
import { CreateCommentFormState } from '@/lib/types';
import { СreateCommentFormSchema } from '@/lib/zodSchemas';
import { authFetchGraphQl } from "@/lib/authFetchGraphQl";
import { CREATE_COMMENT } from "@/lib/gql/mutations/comment";


export const saveComment =
  async (state: CreateCommentFormState, formData: FormData):
    Promise<CreateCommentFormState> => {

    //Валидация данных, полученных из формы, с помощью Zod.
    const validatedFields =
      СreateCommentFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        //Если валидация не прошла, то возвращаем в состояние формы старые данные и добавляем в него ошибки валидации.
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    //Если валидация прошла успешно, делаем запрос на Backend GraphQL API.
    const data = await authFetchGraphQl(print(CREATE_COMMENT), {
      //createCommentInput:{...validatedFields.data}
      //Название переменной (createCommentInput) должно совпадать с названием переменной (c $) в GQL-запросе (CREATE_COMMENT).
      createCommentInput: {
        postId: validatedFields.data.postId,
        content: validatedFields.data.content
      }
    }) as { id: number, postId: number, authorId: number };

    if ( data ) {
      return {
        message: 'Комментарий создан!',
        ok: true,
        //Для закрытия диалогового окна создания комментария
        open: false
      }
    }

    //Если при создании комментария произошла ошибка
    return {
      //Возвращаем обратно данные, полученные из формы.
      data: Object.fromEntries(formData.entries()),
      message: 'Error! Comment not created',
      ok: false,
      //Чтобы диалоговое окно создания комментария не закрылось при ошибке
      open: true
    };
  };
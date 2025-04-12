'use server';
import { print } from 'graphql'
import { PostFormState } from "@/lib/types";
import { PostFormSchema } from "@/lib/zodSchemas";
import { authFetchGraphQl } from "@/lib/authFetchGraphQl";
import { UPDATE_POST_MUTATION } from "@/lib/gql/mutations/post";

export const updatePost = async (state: PostFormState, formData: FormData): Promise<PostFormState> => {
  const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if ( !validatedFields.success ) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //Проверить, изменился ли thumbnail.
  const { thumbnail, ...restInputs } = validatedFields.data

  const data = await authFetchGraphQl(print(UPDATE_POST_MUTATION), {
    updatePostInput: {
      postId: restInputs.postId,
      title: restInputs.title,
      content: restInputs.content,
      tags: restInputs.tags,
      published: restInputs.published,
    }
  })

  if ( !data ) {
    return { message: "Произошла ошибка при обновлении поста", ok: false }
  }

  return { message: "Пост обновлен успешно", ok: true }
}

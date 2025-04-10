'use server';
import { print } from 'graphql';
import { PostFormState } from '@/lib/types';
import { PostFormSchema } from '@/lib/zodSchemas';
import { authFetchGraphQl } from '@/lib/authFetchGraphQl';
import { CREATE_POST_MUTATION } from '@/lib/gql/mutations/post';

export const saveNewPost = async (state: PostFormState, formData: FormData): Promise<PostFormState> => {
  const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  //TODO: Upload Thumbnail-image to supabase storage
  const thumbnailUrl = '';

  const data = await authFetchGraphQl(print(CREATE_POST_MUTATION), {
    createPostInput: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) {
    return {
      message: 'Post created successfully',
      ok: true,
    };
  }

  return {
    message: 'Oops! Something went wrong',
    //В случае ошибки, возвращаем в состояние формы старые данные.
    data: Object.fromEntries(formData.entries()),
  };
};
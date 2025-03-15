'use server';
import { print } from 'graphql';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SignUpFormState as SignInFormState } from '@/lib/types';
import { SignInFormSchema } from '@/lib/zodSchemas';
import { fetchGraphQL } from '@/lib/fetch.GraphQL';
import { SIGN_IN } from '@/lib/gql/mutations';

export const signIn = async (state: SignInFormState, formData: FormData): Promise<SignInFormState> => {
  const validatedFields = SignInFormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log({ formData, validatedFields });

  const data = fetchGraphQL(print(SIGN_IN), {
    signInInput: {
      ...validatedFields.data,
    },
  }) as unknown as {
    signIn: {
      id: number
      name: string
      avatar: string
      accessToken: string
    }
  } & { errors?: { message: string }[] };

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: 'Invalid credentials',
    };
  }

  //TO DO: create a session
  revalidatePath('/');
  redirect('/');
};
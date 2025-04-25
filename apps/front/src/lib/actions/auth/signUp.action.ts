'use server';
import { SignUpFormState } from '@/lib/types';
import { SignUpFormSchema } from '@/lib/zodSchemas';
import { fetchGraphQL } from '@/lib/fetch.GraphQL';
import { print } from 'graphql/index';
import { SIGN_UP } from '@/lib/gql/mutations/auth';
import { redirect } from 'next/navigation';

export const signUp =
  async (
    state: SignUpFormState,
    formData: FormData): Promise<SignUpFormState> => {
    console.log({ formData });
    const validatedFields = SignUpFormSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    console.log({ validatedFields });

    if (!validatedFields.success) {
      return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const data = await fetchGraphQL(print(SIGN_UP), {
      signUpInput: {
        ...validatedFields.data,
      },
    }) as {
      signUp: {
        id: number
        name: string
      }
    } & { errors?: { message: string }[] };

    if (data.errors) {
      return {
        data: Object.fromEntries(formData.entries()),
        message: 'Something went wrong: ' + data.errors,
      };
    }

    redirect('/auth/sign-in');
  };
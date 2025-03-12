"use server"

import { print } from 'graphql';
import { SignUpFormState } from "@/lib/types";
import { SignUpFormSchema } from "@/lib/zodSchemas";
import { fetchGraphQL } from "@/lib/fetch.GraphQL";
import { CREATE_USER } from "@/lib/gql/mutations/createUser.mutation";
import { redirect } from "next/navigation";

export const signUp =
  async (
    state: SignUpFormState,
    formData: FormData): Promise<SignUpFormState> => {
    console.log({formData})
    const validatedFields = SignUpFormSchema.safeParse(
      Object.fromEntries(formData.entries())
    )

    console.log({validatedFields})

    if ( !validatedFields.success ) {
      return {
        errors: validatedFields.error.flatten().fieldErrors
      }
    }

    const data = await fetchGraphQL(print(CREATE_USER), {
      createUserInput: {
        ...validatedFields.data
      }
    }) as {
      createUser: {
        id: number
        name: string
      }
    } & { errors?: { message: string }[] }

    if ( data.errors ) {
      return {
        message: "Something went wrong: " + data.errors
      }
    }

    redirect("/auth/signin")
  }
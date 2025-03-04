'use server'
import { print } from 'graphql'
import { fetchGraphQL } from "@/lib/fetch.GraphQL";
import { GET_POSTS } from "@/lib/gqlQueries";

export const fetchPosts = async () => {
  const data = await fetchGraphQL(print(GET_POSTS))
  return data?.posts
}
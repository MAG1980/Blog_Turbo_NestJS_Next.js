import { Post } from '@prisma/client';

export const fetchGraphQL = async (query: string, variables = {}) => {
  console.log(process.env.BACKEND_URL);
  const response = await fetch(process.env.BACKEND_URL || 'http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Apollo-Require-Preflight': 'true',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result: { data?: { posts: Post[] }, errors?: never } = await response.json();

  if (result.errors) {
    console.log('GraphQL error: ', result.errors);
    throw new Error('Failed to fetch data from GraphQL API');
  }

  return result.data;
};
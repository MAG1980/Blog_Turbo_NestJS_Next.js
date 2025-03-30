import { getSession } from "@/lib/session";

export const authFetchGraphQl = async (query: string, variables = {}) => {
  const session = await getSession()
  if ( !session?.accessToken ) {
    throw new Error('Authorization required')
  }
  const response = await fetch(process.env.BACKEND_GRAPHQL_URL || 'http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ session.accessToken }`
      // 'Apollo-Require-Preflight': 'true',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result: { data: unknown, errors?: unknown } = await response.json();

  if ( result.errors ) {
    console.log('GraphQL error: ', result.errors);
    throw new Error('Failed to fetch data from GraphQL API');
  }

  return result.data;
}
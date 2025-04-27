export const fetchGraphQL = async (query: string, variables = {}) => {

  const response = await fetch(process.env.BACKEND_GRAPHQL_URL || 'http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      // 'Apollo-Require-Preflight': 'true',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // const result: { data: { posts: Post[], postsTotalCount: number }, errors?: never } = await response.json();
  const result: { data: unknown, errors?: unknown } = await response.json();

  if (result.errors) {
    console.log('GraphQL error: ', result.errors);
    throw new Error('Failed to fetch data from GraphQL API');
  }

  return result.data;
};
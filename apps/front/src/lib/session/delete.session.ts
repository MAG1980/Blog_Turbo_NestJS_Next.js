import { cookies } from 'next/headers';

/**
 * Очистка JWT-токена из cookie с заголовком 'session' при Logout.
 */
export async function deleteSession() {
  await (await cookies()).delete('session');
}
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { ENCODED_KEY } from '@/lib/session/encodedKey';
import { Session } from './types';

/**
 * Получение данных аутентифицированного пользователя из JWT-токена,
 * хранящегося в cookie с названием 'session'.
 */
export async function getSession() {
  //Извлекаем JWT-токен из cookie с заголовком 'session'.
  const cookie = (await cookies()).get('session')?.value;

  if (!cookie) {
    //Пользователь не аутентифицирован
    return null;
  }

  try {
    //Проверяем, вносились ли изменения в JWT-токен.
    const { payload } = await jwtVerify(cookie, ENCODED_KEY, {
      algorithms: ['HS256'],
    });

    return payload as Session;
  } catch (error) {
    console.error('Failed to verify JWT token from cookie "session"', error);
    redirect('/auth/signin');
  }
}
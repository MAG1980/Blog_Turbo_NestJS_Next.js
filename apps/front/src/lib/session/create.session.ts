import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { Session } from './types';
import { ENCODED_KEY } from '@/lib/session/encodedKey';

/**
 * Установка в HTTP-only cookie 'session' JWT-токена, сгенерированного из payload,
 * содержащего данные аутентифицированного пользователя.
 * @param payload Session
 */
export async function createSession(payload: Session) {
  //Создание JWT-токена с помощью библиотеки jose
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(ENCODED_KEY);

  //Прибавляем к текущей дате 7 дней и создаём экземпляр класса Date
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set('session', session, {
    //Предотвращает доступ к JWT+токену через JavaScript стороне клиента
    httpOnly: true,
    //Передавать cookies только если используется протокол HTTPS
    secure: process.env.NODE_ENV === 'production',
    //Устанавливает cookies только для текущего домена
    //Предотвращает передачу cookies другим доменам (защита от CSRF-атак)
    sameSite: 'lax',
    //Определяет маршрут, в пределах которого будут доступны cookies.
    //Он должен быть абсолютным, то есть начинаться со /.
    //Если параметр не передан, то cookies будет доступна на всех страницах сайта.
    //В данном случае - cookies доступны во всех маршрутах нашего приложения.
    path: '/',
    expires: expiredAt,
  });
}
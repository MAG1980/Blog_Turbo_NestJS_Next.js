import Link from 'next/link';
import { getSession } from '@/lib/session';
import { SignInPanel } from '@/components/SignInPanel';


export const Navbar = async () => {
  const session = await getSession();
  return (
    <>
      <h1 className="text-2xl font-bold p-2">Мой блог</h1>
      <div
        className="flex flex-col md:flex-row gap-2 ml-auto [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a]:py-2 [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
        <Link href="/">Блог</Link>
        <Link href="#about">Обо мне</Link>
        <Link href="#contact">Контакты</Link>
        {session && session.user ?
          //Если использовать Link,
          // то при выходе пользователя из системы страница не будет перезагружена,
          // и будет отображаться кнопка "Выйти".
          <a href="/api/auth/sign-out">Выйти</a>
          :
          <SignInPanel />}
      </div>
    </>
  );
};
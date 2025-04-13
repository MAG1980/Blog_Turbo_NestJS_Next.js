'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRightStartOnRectangleIcon, ListBulletIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/solid';
import { SessionUser } from '@/lib/session/types';
import Link from 'next/link';
import { useScreen } from 'usehooks-ts';
import { useIsScrollDown } from '@/lib/hooks';
import { cn } from '@/lib/utils';

type Props = {
  user: SessionUser
}

function Profile({ user }: Props) {
  const screen = useScreen();
  const isScrollDown = useIsScrollDown(0);
  return (
    (screen?.width < 768) ? (
        <div className="flex flex-col [&>*]:px-4 [&>*]:py-2 gap-2">
          {/*Если использовать Link,
           то при выходе пользователя из системы страница не будет перезагружена,
           и будет отображаться кнопка "Выйти".*/}
          <a href="/api/auth/sign-out">
            <span>Выйти</span>
          </a>
          <Link href="/user/posts/create">
            <span>Создать новый пост</span>
          </Link>
          <Link href="/user/posts">
            <span>Мои посты</span>
          </Link>
          <div className="flex justify-center items-center gap-3 py-2">
            <UserIcon className="w-4" />
            <p>{user.name}</p>
          </div>
        </div>)
      :
      <Popover>
        <PopoverTrigger>
          <Avatar className="w-8 h-8">
            <AvatarImage
              className={cn('border-white rounded-full  border-2 transition-colors duration-300', { 'border-blue-500': isScrollDown })}
              src={user.avatar} />
            <AvatarFallback>
              <UserIcon className={cn('text-blue-500 transition-colors duration-300', {
                'bg-blue-500': isScrollDown,
                'text-white': isScrollDown,
              })} />
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="md:text-white md:bg-gray-950 rounded-md z-10">

          <div className="
        max-w-52
        rounded-md *:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 *:px-2
        [&>*>span]:col-span-4
        [&>*:hover]:bg-sky-500
        *:transiton *:rounded-md
        [&>*>*:nth-child(1)]:justify-self-center
        [&>*>span]:pr-4
        ">
            <div className="flex justify-center items-center gap-3 py-2">
              <UserIcon className="w-4" />
              <p className="col-span-4 text-wrap">{user.name}</p>
            </div>
            {/*Если использовать Link,
           то при выходе пользователя из системы страница не будет перезагружена,
           и будет отображаться кнопка "Выйти".*/}
            <a href="/api/auth/sign-out">
              <ArrowRightStartOnRectangleIcon className="w-4" />
              <span>Выйти</span>
            </a>
            <Link href="/user/posts/create">
              <PencilSquareIcon className="w-4" />
              <span>Создать новый пост</span>
            </Link>
            <Link href="/user/posts">
              <ListBulletIcon className="w-4" />
              <span>Мои посты</span>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
  );
}

export default Profile;
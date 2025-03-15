import Link from 'next/link';

type Props = {};

export function SignInPanel(props: Props) {
  return (
    <>
      <Link href={'/auth/sign-in'}>Войти</Link>
      <Link href={'/auth/sign-up'}>Зарегистрироваться</Link>
    </>
  );
};
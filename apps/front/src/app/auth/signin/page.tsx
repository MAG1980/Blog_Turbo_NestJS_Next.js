import Link from 'next/link';
import SignInForm from '@/app/auth/signin/_components/SignInForm';

function SignInPage() {
  return (
    <div className="flex flex-col justify-center align-center gap-3 w-96 bg-white p-8 border rounded-md shadow-md">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
    <SignInForm/>
      <Link
        className="text-center underline"
        href={'/auth/forgot'}
      >
        Забыли пароль?
      </Link>
    </div>
  );
}

export default SignInPage;
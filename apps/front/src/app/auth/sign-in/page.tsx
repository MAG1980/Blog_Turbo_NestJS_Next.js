import Link from 'next/link';
import { SignInForm } from '@/app/auth/sign-in/_components/SignInForm';
import { Button } from '@/components/ui/button';

function SignInPage() {
  return (
    <div className="flex flex-col justify-center align-center gap-3 w-96 bg-white p-8 border rounded-md shadow-md">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SignInForm />
      <Link
        className="text-center underline"
        href={'/auth/forgot'}
      >
        Забыли пароль?
      </Link>
      <Button>
        <a href={`${process.env.BACKEND_URL}/auth/google/login`}>Sign In with Google</a>
      </Button>
    </div>
  );
}

export default SignInPage;
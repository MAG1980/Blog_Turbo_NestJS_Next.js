import React from 'react';
import Link from "next/link";
import SignUpForm from "@/app/auth/signup/_components/SignUpForm";

function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-md p-8 w-96">
      <h2 className="text-center text-2xl font-bold mb-4">SignUpPage</h2>

      <SignUpForm/>

      <div>
        <p>У вас уже есть аккаунт?</p>
        <Link className={ "underline" } href={ "/auth/signin" }>Войти</Link>
      </div>
      <div>
      </div>
    </div>
  );
}

export default SignUpPage;
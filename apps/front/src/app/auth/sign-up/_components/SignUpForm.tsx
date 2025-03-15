'use client';
import React, { useActionState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { signUp } from '@/lib/actions/auth';

export const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form
      action={action}
      className={'flex flex-col gap-2'}
    >
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input id="name" name="name" placeholder="Иван Иванов" defaultValue={state?.data?.name} />
      </div>
      {!!state?.errors?.name && (
        <p className="text-red-500 text-sm">{state.errors.name}</p>
      )}

      <div>
        <Label htmlFor="email">Адрес электронной почты</Label>
        <Input id="email" name="email" placeholder="name@example.mail.com" defaultValue={state?.data?.email} />
      </div>
      {!!state?.errors?.email && (
        <p className="text-red-500 text-sm">{state.errors.email}</p>
      )}

      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
        />
      </div>
      {!!state?.errors?.password && (
        <div className="text-red-500 text-sm">
          <p>Пароль должен удовлетворять следующим требованиям:</p>
          <ul>
            {state.errors.password.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <SubmitButton>Зарегистрироваться</SubmitButton>
    </form>
  );
};
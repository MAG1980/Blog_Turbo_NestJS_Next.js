'use client'
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";

function SignUpForm() {
  return (
    <form className={ "flex flex-col gap-2" }>
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input id="name" name="name" placeholder="Иван Иванов"/>
      </div>

      <div>
        <Label htmlFor="email">Адрес электронной почты</Label>
        <Input id="email" name="email" placeholder="name@example.mail.com"/>
      </div>

      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" name="password" type="password"/>
      </div>

      <SubmitButton>Зарегистрироваться</SubmitButton>
    </form>
  );
}

export default SignUpForm;
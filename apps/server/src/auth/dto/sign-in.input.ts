import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  //Пользователи, зарегистрированные с помощью OAuth, не имеют пароля.
  //Предотвращаем возможность аутентификации пользователя через query аутентификации с паролем, состоящим из пустой строки.
  @MinLength(1)
  @Field()
  password: string;
}

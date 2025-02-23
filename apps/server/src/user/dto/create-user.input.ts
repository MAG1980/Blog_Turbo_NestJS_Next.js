import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  // @IsStrongPassword()
  @IsString()
  @Length(3, 10)
  @Field()
  password: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  bio?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  avatar?: string;
}

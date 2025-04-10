import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  content: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  thumbnail?: string;

  @IsBoolean()
  @Field(() => Boolean)
  published: boolean;

  @IsString({ each: true })
  @Field(() => [String])
  tags: string[];
}

import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  //authorId будет извлекаться из JWT-токена аутентифицированного пользователя, хранящегося в заголовке Authorization (Request).

  @Field(() => Int)
  @IsNumber()
  postId: number;

  @Field(() => String, { description: 'Comment content)' })
  @IsString()
  content: string;
}

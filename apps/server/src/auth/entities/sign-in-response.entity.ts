import { Field, ObjectType } from '@nestjs/graphql';
import { ValidatedUserEntity } from './validated-user.entity';

@ObjectType()
export class SignInResponseEntity {
  @Field()
  user: ValidatedUserEntity;

  @Field()
  accessToken: string;
}

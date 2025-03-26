import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { SignInResponseEntity } from './entities/sign-in-response.entity';
import { UserService } from '../user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => SignInResponseEntity)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.userService.validateLocalUser(signInInput);
    return this.authService.signIn(user);
  }
}

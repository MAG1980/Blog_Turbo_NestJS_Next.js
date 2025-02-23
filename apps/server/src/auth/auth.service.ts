import { Injectable } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(signInInput: SignInInput) {
    const user = await this.userService.validateLocalUser(signInInput);
    return user;
  }
}

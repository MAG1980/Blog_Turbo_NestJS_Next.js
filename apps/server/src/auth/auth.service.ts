import { Injectable } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './types/jwt-auth-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(signInInput: SignInInput) {
    const user = await this.userService.validateLocalUser(signInInput);
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken: await this.generateToken(user.id),
    };
  }

  async generateToken(userId: number) {
    const jwtPayload: JwtAuthPayload = {
      sub: {
        id: userId,
      },
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return accessToken;
  }
}

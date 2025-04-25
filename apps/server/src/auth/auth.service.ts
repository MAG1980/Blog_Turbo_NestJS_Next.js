import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload, ValidatedUser } from './types';
import { SignUpInput } from './dto/sign-up.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const user = await this.userService.findOneByEmail(signUpInput.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return await this.userService.create(signUpInput);
  }

  async signIn(
    user: ValidatedUser,
  ): Promise<ValidatedUser & { accessToken: string }> {
    const { accessToken } = await this.generateToken(user.id);
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }

  async generateToken(userId: number) {
    const jwtPayload: JwtAuthPayload = {
      sub: {
        id: userId,
      },
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return { accessToken };
  }
}

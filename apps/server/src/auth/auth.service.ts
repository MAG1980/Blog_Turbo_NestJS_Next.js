import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './types';
import { ValidatedUser } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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

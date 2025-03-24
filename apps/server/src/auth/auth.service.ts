import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './types/jwt-auth-payload';
import { CreateUserInput } from '../user/dto/create-user.input';

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

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id };
  }

  async validateGoogleUser(profile: CreateUserInput) {
    const user = await this.userService.getUserByEmail(profile.email);

    //Если пользователь с таким email уже зарегистрирован, то возвращаем его данные без пароля
    if (user) {
      return user;
    }

    //Регистрируем и возвращаем данные нового пользователя без пароля
    return await this.userService.create(profile);
  }
}

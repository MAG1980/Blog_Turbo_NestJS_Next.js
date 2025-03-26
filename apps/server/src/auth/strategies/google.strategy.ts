import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    //Нужно проверить наличие регистрации пользователя по адресу электронной почты, полученному от Google в
    // переменной profile.
    //Если пользователь не зарегистрирован, то сохраняем нового пользователя в базе данных.
    const user = await this.userService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value,
      password: '',
    });
    //Первый параметр - ошибка (не реализуем),
    //второй - данные пользователя, которые должны быть помещены в свойство Request.user в результате успешной аутентификации
    done(null, user);
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthPayload } from '../types';
import { Inject } from '@nestjs/common';
import { UserService } from '../../user/user.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      //Извлечение JWT-токена из заголовка Authorization : 'Bearer токен'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //Получение секретного ключа из объекта настроек, переданного в ConfigModule
      secretOrKey: configService.get<string>('JWT_SECRET'),
      //Учитывать срок действия токена при валидации
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtAuthPayload) {
    const {
      sub: { id },
    } = payload;

    //К Request будет добавлено свойство user.id
    return this.userService.validateJwtUser(id);
  }
}

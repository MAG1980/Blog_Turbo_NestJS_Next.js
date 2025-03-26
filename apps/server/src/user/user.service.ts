import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { SignInInput } from '../auth/dto/sign-in.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...user } = createUserInput;
    const hashedPassword = await hash(password);

    return await this.prismaService.user.create({
      data: { password: hashedPassword, ...user },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        avatar: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const { password: hashedPassword, ...userDataWithoutPassword } =
      await this.findOneByEmail(email);

    const isPasswordMatched = await verify(hashedPassword, password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return userDataWithoutPassword;
  }

  async validateJwtUser(userId: number) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id };
  }

  async validateGoogleUser(profile: CreateUserInput) {
    const user = await this.getUserByEmail(profile.email);

    //Если пользователь с таким email уже зарегистрирован, то возвращаем его данные без пароля
    if (user) {
      return user;
    }

    //Регистрируем и возвращаем данные нового пользователя без пароля
    return await this.create(profile);
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });
  }
}

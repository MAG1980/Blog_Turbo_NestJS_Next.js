import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String, { name: 'getHelloWorld' })
  getHelloWorld() {
    return 'Hello World!';
  }
}

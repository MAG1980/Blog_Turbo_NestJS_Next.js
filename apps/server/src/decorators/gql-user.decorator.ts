import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlUser = createParamDecorator(
  (property: string | null, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<
      //Типизация контекста. Добавление к стандартному контексту GraphQL свойства user.
      GqlExecutionContext & { req: { user: Record<string, unknown> } }
    >().req.user;

    if (!user) {
      return null;
    }

    if (property) {
      return user[property];
    }

    return user;
  },
);

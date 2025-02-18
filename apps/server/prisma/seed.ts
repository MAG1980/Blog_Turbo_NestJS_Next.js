import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';
import * as process from 'node:process';

const prisma = new PrismaClient();

function generateSlug(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      //Заменяет пробелы на дефисы.
      .replace(/ /g, '-')
      //Удаляет все символы, не являющиеся буквами, цифрами и дефисом.
      .replace(/^\w-]+/g, '')
  );
}

async function main() {
  if (process.env.NODE_ENV !== 'DEVELOPMENT') {
    console.log('!!!Is not DEVELOPMENT mode!!! Seeding is skipped');
    return;
  }

  //Очистка базы данных
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tag.deleteMany();

  //Создаём пользователей
  const users = await prisma.user.createManyAndReturn({
    data: Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      bio: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
    })),
  });

  //Создаём теги
  const tags = await prisma.tag.createManyAndReturn({
    data: Array.from(
      new Set(
        Array.from({ length: 10 }).map(() => ({
          name: faker.word.adjective(),
        })),
      ),
    ),
  });

  const posts = Array.from({ length: 20 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.urlLoremFlickr({ category: 'nature' }),
    //Случайное число в заданной диапазоне (1-10, т.к. у нас 10 пользователей)
    authorId: faker.helpers.arrayElement(users).id,
    published: true,
  }));

  //Код продолжит выполнение только после того, как все посты будут созданы (обещания выполнены).
  await Promise.all(
    posts.map(async (post) => {
      await prisma.post.create({
        data: {
          ...post,
          comments: {
            //Создаём по несколько комментариев к каждому посту "на лету"
            createMany: {
              data: Array.from({
                length: faker.number.int({ min: 0, max: 5 }),
              }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.helpers.arrayElement(users).id,
              })),
            },
          },
        },
      });
      // console.log({ createdPost });
    }),
  );

  const postsFromDb = await prisma.post.findMany();

  //Соединяем посты с тегами (неявная связь many-to-many)
  await Promise.all(
    postsFromDb.map(async (post) => {
      await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          tags: {
            connect: faker.helpers
              .arrayElements(tags, { min: 0, max: 5 })
              .map((tag) => ({ id: tag.id })),
          },
        },
      });
    }),
  );

  //Соединяем "лайки" с пользователями и постами (явная связь many-to-many)
  const likes = Array.from({ length: 100 }).map(() => ({
    userId: faker.helpers.arrayElement(users).id,
    postId: faker.helpers.arrayElement(postsFromDb).id,
  }));

  for (const like of likes) {
    await prisma.like.upsert({
      where: {
        userIdPostId: {
          userId: like.userId,
          postId: like.postId,
        },
      },
      create: {
        userId: like.userId,
        postId: like.postId,
      },
      update: {
        userId: like.userId,
        postId: like.postId,
      },
    });
  }

  console.log('Seeding is complete!');
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((error) => {
    prisma.$disconnect();
    console.log(error);
    process.exit(1);
  });

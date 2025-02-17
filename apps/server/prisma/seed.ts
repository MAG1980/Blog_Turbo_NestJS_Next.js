import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';

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
  //Создаём 10 пользователей
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }));

  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 40 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.urlLoremFlickr({ category: 'nature' }),
    //Случайное число в заданной диапазоне (1-10, т.к. у нас 10 пользователей)
    authorId: faker.number.int({ min: 1, max: 10 }),
    published: true,
  }));

  //Код продолжит выполнение только после того, как все посты будут созданы (обещания разрешены).
  await Promise.all(
    posts.map(async (post) => {
      const createdPost = await prisma.post.create({
        data: {
          ...post,
          comments: {
            //Создаём по несколько комментариев к каждому посту "на лету"
            createMany: {
              data: Array.from({
                length: faker.number.int({ min: 0, max: 15 }),
              }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.number.int({ min: 1, max: 10 }),
              })),
            },
          },
        },
      });
      console.log({ createdPost });
    }),
  );

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

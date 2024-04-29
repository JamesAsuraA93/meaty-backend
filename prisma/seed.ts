// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.product.upsert({
    where: { name: 'Gancha', id: 1 },
    update: {},
    create: {
      name: 'Gancha #1',
      description: 'Description of Gancha #1',
      price: 35,
      Image: {
        create: {
          encoding: 'utf-8',
          filename: 'gancha.jpg',
          mimetype: 'image/jpeg',
          path: '/public/images/gancha.jpg',
          size: 123456,
        },
      },
    },
  });

  const post2 = await prisma.product.upsert({
    where: { name: 'Gancha', id: 2 },
    update: {},
    create: {
      name: 'Gancha #2',
      description: 'Description of Gancha #2',
      price: 45,
    },
  });

  const post3 = await prisma.product.upsert({
    where: { name: 'Gancha', id: 3 },
    update: {},
    create: {
      name: 'Gancha #3',
      description: 'Description of Gancha #3',
      price: 55,
    },
  });

  console.log({ post1, post2, post3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

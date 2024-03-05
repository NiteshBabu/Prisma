import { faker as f } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const data = Array.from({ length: 10 }).map((_) => ({
  name: f.person.fullName(),
  email: f.internet.email({
    provider: "cims.io",
  }),
}));

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data,
  });
};

main().catch(async (e) => {
  console.log(e);
  await prisma.$disconnect();
});

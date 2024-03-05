import { PrismaClient, User } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient({
  // log: ["query"]
});
export default prisma;

const userNames = [
  "Nick",
  "Neon",
  "Taylor",
  "Ed",
  "Jessie",
  "LilNas",
  "Jason",
  "Jennifer",
];

const users: Omit<User, "id" | "userPreferenceId">[] = [];

for (let user of userNames) {
  users.push({
    name: user,
    email: `${user.toLowerCase()}@gmail.com`,
  });
}

const main = async () => {
  // await prisma.user.deleteMany();

  // Create

  // Find by prop
  const user = await prisma.user.findFirst({
    // use where to look for props
    // where: {
    //   name: "Nitesh Babu",
    //   email: "nitesh@gmail.com",
    // },
    // you can either use select or include but not both
    // use select to select fields returned in result
    // select: {
    //   id: true,
    //   name: true,
    //   email: true,
    //   userPreference: true,
    // },
    // use include to include whole node returned in result
    include: {
      userPreference: true,
      posts: true,
      profile: true,
    },
  });

  // if (user) {
  //   const newPost = await prisma.post.create({
  //     data: {
  //       title: "New Post",
  //       author: {
  //         connect: {
  //           id: user.id,
  //         },
  //       },
  //     },
  //   });
  // }
  console.dir(user, { depth: null });

  // const userPreference = await prisma.userPreference.create({
  //   data: {
  //     newsletterSignup: true,
  //     userId: "tyuiotyo",
  //   },
  // });

  // await prisma.user.update({
  //   where: {
  //     email: "taylor@gmail.com",
  //   },
  //   data: {
  //     userPreference: {
  //       create: {
  //         newsletterSignup: true,
  //       },
  //     },
  //   },
  // });

  // const userPreference = await prisma.userPreference.findFirst({
  //   select: {
  //     newsletterSignup: true,
  //     user: true,
  //     userId: true,
  //     id: true,

  //   },
  // });
  // console.log(users);
};

// main()
//   .catch(async (e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

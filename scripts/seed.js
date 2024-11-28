const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client for database operations
const { faker } = require('@faker-js/faker'); // Import faker for generating fake data
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords

const prisma = new PrismaClient(); // Instantiate PrismaClient

async function main() {
  const productCount = 100_000; // Number of products to generate
  const userCount = 1000; // Number of users to generate

  console.log('Seeding Products...'); // Log the start of product seeding
  // Generate an array of product data using faker
  const productData = Array.from({ length: productCount }).map(() => ({
    name: faker.commerce.productName(), // Generate a fake product name
    description: faker.commerce.productDescription(); // Generate a fake product description
    price: parseFloat(faker.commerce.price({ min: 1, max: 1000, dec: 2 })), // Generate a fake product price
    releaseDate: faker.date.between({ from: '2024-01-01', to: '2024-12-31' }), // Generate a fake release date within the year 2024
  }));

  // Create many products in the database using Prisma
  await prisma.product.createMany({
    data: productData,
  });
  console.log(`${productCount} Products seeded.`); // Log the number of products seeded

  console.log('Seeding Users...'); // Log the start of user seeding
  // Generate an array of user data using faker and bcrypt
  const userData = await Promise.all(
    Array.from({ length: userCount }).map(async () => ({
      username: `${faker.internet.username()}-${faker.git.commitSha()}`, // Generate a fake username
      passwordHash: await bcrypt.hash(faker.internet.password(), 10), // Hash a fake password with bcrypt
      isPrivileged: faker.datatype.boolean(), // Generate a fake boolean for user privileges
      cartRef: null, // Set cartRef to null
    }))
  );

  // Create many users in the database using Prisma
  await prisma.user.createMany({
    data: userData,
  });

  console.log(`${userCount} Users seeded.`); // Log the number of users seeded
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e); // Log any errors that occur during seeding
    process.exit(1); // Exit the process with a status code of 1 to indicate failure
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect from the Prisma Client
  });

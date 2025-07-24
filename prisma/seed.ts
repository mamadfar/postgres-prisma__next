import { PrismaClient } from "./../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create some sample posts
  const posts = [
    {
      title: "Getting Started with Next.js",
      content:
        "Next.js is a powerful React framework that enables you to build full-stack applications with ease. It provides features like server-side rendering, static site generation, and API routes out of the box.",
    },
    {
      title: "Understanding Docker Containers",
      content:
        'Docker containers are lightweight, portable, and self-sufficient units that can run applications consistently across different environments. They help solve the "it works on my machine" problem.',
    },
    {
      title: "Database Design Best Practices",
      content:
        "Good database design is crucial for application performance and maintainability. This includes proper normalization, indexing strategies, and choosing the right data types.",
    },
    {
      title: "Introduction to TypeScript",
      content:
        "TypeScript adds static type checking to JavaScript, helping catch errors at compile time and improving code reliability and maintainability in large applications.",
    },
    {
      title: "Modern CSS with Tailwind",
      content:
        "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs quickly without leaving your HTML.",
    },
    {
      title: "API Development with Prisma",
      content:
        "Prisma is a next-generation ORM that provides type-safe database access, automatic migrations, and a powerful query engine for modern applications.",
    },
  ];

  console.log("Creating posts...");
  for (const post of posts) {
    const createdPost = await prisma.post.create({
      data: post,
    });
    console.log(`✅ Created post: ${createdPost.title}`);
  }

  console.log("✨ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

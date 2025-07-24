# PostgreSQL Setup for Local Development with Docker

Run PostgreSQL in Docker locally:

```bash
docker run --name local-postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_DB=mydb \
 -p 5432:5432 \
 -d postgres:17
```

# Prisma Setup

1. Install Prisma CLI:
   ```bash
   npm install prisma --D
   # OR
   pnpm install prisma --D
   ```
2. Initialize Prisma:
   ```bash
   pnpx prisma init --datasource-provider postgresql --output ../generated/prisma
   ```

- Instead of `postgresql`, you can use `sqlite` as the provider or any other supported database.
- Prisma will update the `.env` file with the database connection string, which you can modify as needed.

3. Update the `prisma/schema.prisma` file with your database schema.

```prisma
model Post {
  id      Int    @id @default(autoincrement())
  title   String
  content String
}
```

- The ugly way to update our database is to use this command:
  ```bash
  pnpx prisma db push
  ```

4. Run the prisma studio:

   ```bash
   pnpx prisma studio
   ```

5. Add a record manually in the Prisma Studio UI.

6. Generate Prisma Client:
   ```bash
   pnpx prisma generate
   ```
7. To ensure we have only one instance of Prisma Client, we can use the following code in our Next.js app in `src/lib/db.ts`:

   ```typescript
   import { PrismaClient } from "./../../generated/prisma";
   const globalForPrisma = global as unknown as { prisma: PrismaClient };
   const prisma = globalForPrisma.prisma || new PrismaClient();
   if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
   ```

8. Now in our page we can use it like this:

   ```typescript
   import { prisma } from "@/lib/db";

   export default async function Home() {
     const post = await prisma.post.findMany();
     return (
       <div>
         <h1>Posts</h1>
         <ul>
           {post.map((p) => (
             <li key={p.id}>
               <h2>{p.title}</h2>
               <p>{p.content}</p>
             </li>
           ))}
         </ul>
       </div>
     );
   }
   ```

9. To create a new post, we can create an action in `src/actions/Post.action.ts`:

   ```typescript
   import { prisma } from "@/lib/db";
   import { revalidatePath } from "next/cache";

   export async function createPost(formData: FormData) {
     "use server";
     const title = formData.get("title") as string;
     const content = formData.get("content") as string;

     await prisma.post.create({
       data: {
         title,
         content,
       },
     });
     revalidatePath("/");
   }
   ```

10. To update the DB schema, we can modify the `prisma/schema.prisma` file and then run:

    ```bash
    pnpx prisma db push
    ```

- In this case, we can't track changes, instead we can use migrations:

```bash
pnpx prisma migrate dev --name [migration_name]
```

11. To reset the DB, we can use this command but **be careful** it will delete all data:

```bash
pnpx prisma migrate reset
```

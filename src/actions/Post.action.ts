"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createPost = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  revalidatePath("/");
};

import UpvoteBtn from "@/components/UpvoteBtn";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface IPostProps {
  params: Promise<{
    id: string;
  }>;
}

//* This function generates static paths for the dynamic route
//* It fetches all post IDs from the database and returns them as static parameters
//* This is useful for pre-rendering the pages at build time
//* It helps improve performance and SEO by serving static pages
export const generateStaticParams = async () => {
  const postIds = await prisma.post.findMany({
    select: { id: true },
  });
  return postIds.map((post) => ({
    id: String(post.id),
  }));
};

const Post = async ({ params }: IPostProps) => {
  const id = (await params).id;

  const response = await prisma.post.findUnique({
    where: { id: Number(id) },
    select: {
      title: true,
      content: true,
    },
  });

  const post = await response;

  if (!post) {
    return notFound();
  }

  return (
    <div className="text-center pt-12">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>
      <div className="flex justify-center mt-8">
        <UpvoteBtn />
      </div>
    </div>
  );
};

export default Post;

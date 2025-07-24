import { createPost } from "@/actions/Post.action";
import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";

const Posts = async () => {
  const response = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const posts = await response;

  return (
    <div className="text-center pt-12">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id} className="border p-4 rounded-lg">
            <Link
              href={`/posts/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <form action={createPost} className="max-w-xs mx-auto mt-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <textarea
          name="content"
          placeholder="Content"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default Posts;

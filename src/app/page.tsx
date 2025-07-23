import { createPost } from "@/actions/Post.action";
import { prisma } from "@/lib/db";

export default async function Home() {
  const post = await prisma.post.findMany();

  return (
    <div className="text-center pt-12">
      <h1 className="text-3xl font-bold">Posts</h1>
      <ul>
        {post.map((p) => (
          <li key={p.id}>
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-gray-600">{p.content}</p>
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
}

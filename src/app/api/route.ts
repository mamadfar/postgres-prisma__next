import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const titles = await prisma.post.findMany({
    select: {
      title: true,
    },
  });
  return NextResponse.json(titles);
};
